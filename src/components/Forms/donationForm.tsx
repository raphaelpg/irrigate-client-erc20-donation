import React, { useState, useContext, useEffect } from 'react';
import config from '../../config/config';
import { web3Services } from '../../services/web3.services';
import { ITransaction } from '../../interfaces/Transaction';
import { IAppContext, AppContext } from '../../context/AppContext';
import Web3 from 'web3';
import ecr20Contract from '../../contracts/Dai.json'

interface IDonationForm {
  handleDonation: (status: boolean) => void;
  displayForm: boolean;
  donationParams: {associationName: string, associationAddress: string}
};

const DonationForm: React.FC<IDonationForm> = (props) => {
  const componentContext: IAppContext | null = useContext(AppContext);
  const retrieveAssociationsList = componentContext?.retrieveAssociationsList;
  const [donationStatus, setDonationStatus] = useState<number>(0);
  // const [responseMsg, setResponseMsg] = useState<string>('');
  const initialDonation = {
    "associationName": "",
    "associationAddress": "",
    "amount": "",
    "currency": ""
  };

  const [newDonation, setNewDonation] = useState<ITransaction>(initialDonation);

  useEffect(() => {
    setNewDonation({
      associationName: props.donationParams.associationName,
      associationAddress: props.donationParams.associationAddress,
      amount: "",
      currency: config.web3.erc20Name
    })
  }, [props.donationParams])

  // const clearDonationState = () => {
  //   setNewDonation(initialDonation);
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewDonation(prevNewDonation => ({
      ...prevNewDonation,
      [name]: value,
    }));
  };

  const makeDonation = async () => {
    setDonationStatus(1);
		if (localStorage.getItem("web3") == "connected") {
			console.log("sending tx to", newDonation.associationName, newDonation.associationAddress)
      web3Services.sendErc20Donation(newDonation)
      
      const irrigateAddress = config.web3.irrigateAddress;
      const erc20Address = config.web3.erc20Address;
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const erc20Instance = new web3.eth.Contract(ecr20Contract.abi as any, erc20Address);
      await erc20Instance.events.Transfer({
        filter: { src: accounts[0], dst: irrigateAddress },
        fromBlock: "latest"
      })
      .on("connected", () => {
        console.log("ERC20 IN LISTENER: Started");
      })
      .on('data', async (event: any) => {
        if (event.returnValues.wad == newDonation.amount.toString()) {
          console.log("Donation received");
          setDonationStatus(2);
          await erc20Instance.events.Transfer({
            filter: { src: irrigateAddress, dst: newDonation.associationAddress },
            fromBlock: "latest"
          })
          .on("connected", () => {
            console.log("ERC20 OUT LISTENER: Started");
          })
          .on('data', async () => {
            console.log("Donation transferred");
            setDonationStatus(3);
            retrieveAssociationsList();
          })
        }
      })
		} else {
			alert("Connect Metamask first")
		}
	}

  return(
    <div className="formContainer" style={props.displayForm ? {"display":"flex"} : {"display":"none"}}>
      <div className="formTitle">
        <h2>Make a donation to {newDonation.associationName}</h2>
        <button className="closeButton" onClick={() => props.handleDonation(false)}>x</button>
      </div> 
      <div className="irrigateForm">
        {donationStatus == 1 ? 
          <div className="donationFormLogContainer">
            <div>...waiting for wallet confirmation</div>
          </div>
          :
          donationStatus == 2 ?
          <div className="donationFormLogContainer">
            <div>Irrigate received your transfer</div><br></br>
            <div>...Transferring to association</div>
          </div>
          :
          donationStatus == 3 ?
          <div className="donationFormLogContainer">
            <div>Success, your donation has been sent to the association</div>
            <button className="introduction-button irrigateFormButton" onClick={() => props.handleDonation(false)}>Ok</button>
          </div>
          :
          <div className="donationFormBottomContainer">
            <label className="formLabel">Amount in {config.web3.erc20Name}:
              <input 
                type="text" 
                name="amount" 
                id="amount" 
                onChange={handleChange}
                value={newDonation.amount}
                required
              />
            </label>
            <button className="introduction-button irrigateFormButton" onClick={() => makeDonation()}>Donate</button>
          </div>
        }
      </div>
    </div>
  );
};

export default DonationForm;