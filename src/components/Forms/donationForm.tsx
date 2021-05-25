import React, { useState, useContext, useEffect } from 'react';
import config from '../../config/config';
import { web3Services } from '../../services/web3.services';
import { ITransaction } from '../../interfaces/Transaction';
import { IAppContext, AppContext } from '../../context/AppContext';

interface IDonationForm {
  handleDonation: (status: boolean) => void;
  displayForm: boolean;
  donationParams: {associationName: string, associationAddress: string}
};

const DonationForm: React.FC<IDonationForm> = (props) => {
  const componentContext: IAppContext | null = useContext(AppContext);
  const retrieveAssociationsList = componentContext?.retrieveAssociationsList;
  const [donationStatus, setDonationStatus] = useState<{code: number, msg: string}>({code: 0, msg: "none"});
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

  const closeDonationForm = () => {
    setDonationStatus({code: 0, msg: "none"});
    setNewDonation(initialDonation);
    props.handleDonation(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewDonation(prevNewDonation => ({
      ...prevNewDonation,
      [name]: value,
    }));
  };

  const makeDonation = async () => {
    if (localStorage.getItem("web3") == "connected") {
      const balanceCheck = await web3Services.checkUserERC20Balance(newDonation.amount); 
      if (balanceCheck) {
        // setDonationStatus(1);
        web3Services.sendErc20Donation(newDonation, setDonationStatus)
        console.log("sending tx to", newDonation.associationName, newDonation.associationAddress)
        web3Services.subscribeToEvents(newDonation, setDonationStatus, retrieveAssociationsList);
      } else {
        alert("Insufficient funds");
        closeDonationForm();
      }
		} else {
			alert("Connect Metamask first");
		}
	}

  return(
    <div className="formContainer" style={props.displayForm ? {"display":"flex"} : {"display":"none"}}>
      <div className="formTitle">
        <h2>Make a donation to {newDonation.associationName}</h2>
        <button className="closeButton" onClick={() => props.handleDonation(false)}>x</button>
      </div> 
      <div className="irrigateForm">
        {donationStatus.code == 1 ? 
          <div className="donationFormLogContainer">
            <div>...waiting for wallet confirmation</div>
          </div>
          :
          donationStatus.code == 2 ?
          <div className="donationFormLogContainer">
            <div>Irrigate received your transfer</div><br></br>
            <div>...Transferring to association</div>
          </div>
          :
          donationStatus.code == 3 ?
          <div className="donationFormLogContainer">
            {/* <div>Success, your donation has been transferred to the association</div> */}
            <div>{donationStatus.msg}</div>
            <button className="introduction-button irrigateFormButton" onClick={() => closeDonationForm()}>Ok</button>
          </div>
          :
          donationStatus.code == 4 ?
          <div className="donationFormLogContainer">
            <div>{donationStatus.msg}</div>
            <button className="introduction-button irrigateFormButton" onClick={() => closeDonationForm()}>Ok</button>
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