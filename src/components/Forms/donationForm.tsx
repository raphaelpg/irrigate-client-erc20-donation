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
  // const [status, setStatus] = useState<string>('');
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

  const makeDonation = () => {
		if (localStorage.getItem("web3") == "connected") {
			console.log("sending tx to", newDonation.associationName, newDonation.associationAddress)
      web3Services.sendErc20Donation(newDonation, retrieveAssociationsList)
		} else {
			alert("Connect Metamask first")
		}
	}

  return(
    <div className="formContainer" style={props.displayForm ? {"display":"flex"} : {"display":"none"}}>
      <div className="formTitle">
        <h2>Make a donation</h2>
        <button className="closeButton" onClick={() => props.handleDonation(false)}>x</button>
      </div> 
      <div
        className="irrigateForm"
        
      >
        <div>To {newDonation.associationName}</div>
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
        {/* {status === "SUCCESS" ? <p className="form-result">{responseMsg}</p> : <button className="introduction-button irrigateFormButton" type="submit">Donate</button>} */}
        {/* {status === "ERROR" && <p className="form-result-error">{responseMsg}</p>} */}
      </div>
    </div>
  );
};

export default DonationForm;