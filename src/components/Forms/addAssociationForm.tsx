import React, { useState, useContext } from 'react';
// import config from '../../config/config';
import associationService from '../../services/associations.service';
import { IAssociation } from '../../interfaces/Association';
import { IAppContext, AppContext } from '../../context/AppContext';

interface IAddAssociationForm {
  handleAssociation: (status: boolean) => void;
  displayForm: boolean;
};

const AddAssociationForm: React.FC<IAddAssociationForm> = (props) => {
  const componentContext: IAppContext | null = useContext(AppContext);
  const retrieveAssociationsList = componentContext?.retrieveAssociationsList;
  const [status, setStatus] = useState<string>('');
  const [responseMsg, setResponseMsg] = useState<string>('');
  const initialAssociation = {
    "name": "", 
    "description": "",
    "link": "",
    "category": "Animal Protection",
    "continent": "Worldwide",
    "country": "",
    "address": "",
    "logo": "",
    "contactName": "",
    "contactEmail": "",
  };

  const [newAssociation, setNewAssociation] = useState<IAssociation>(initialAssociation);

  const clearAssociationState = () => {
    setNewAssociation(initialAssociation);
    (document.getElementById("file-uploaded") as HTMLInputElement).value = "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAssociation(prevNewAssociation => ({
      ...prevNewAssociation,
      [name]: value,
    }));
  };

  const handleLogoChange = () => {
    let filesSelected = (document.getElementById("file-uploaded") as HTMLInputElement).files;
    if (filesSelected != null) {
      let fileSize = filesSelected[0].size;
      if (filesSelected.length > 0 && fileSize <= 50000) {
        let fileToLoad = filesSelected[0];
        let fileReader = new FileReader();
        fileReader.onloadend = () => {
          setNewAssociation({...newAssociation, logo: fileReader.result as string})
        };
        fileReader.readAsDataURL(fileToLoad);
      } else {
        alert('File size too big, image must be less than 50kb');
      };
    };
  };

  const sendAssociation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    associationService.addAssociation(newAssociation)
    .then(result => {
      if (result.msg === "Association added successfully") {
        clearAssociationState();
        if (retrieveAssociationsList) retrieveAssociationsList();
        setStatus('SUCCESS');
        setResponseMsg(result.msg);
      } else {
        setStatus('ERROR');
        setResponseMsg(result.msg);
      }
    })
    .catch(err => {
      setStatus('ERROR');
      console.log(err);
      setResponseMsg('Error, please try later');
    });
  };

  return(
    <div className="formContainer" style={props.displayForm ? {"display":"flex"} : {"display":"none"}}>
      <div className="formTitle">
        <h2>Tell us more about your association</h2>
        <button className="closeButton" onClick={() => props.handleAssociation(false)}>x</button>
      </div> 
      <form
        className="irrigateForm"
        method="post"
        onSubmit={sendAssociation}
      >
        <label className="formLabel">Association's name:
          <input 
            type="text" 
            name="name" 
            id="name" 
            onChange={handleChange}
            value={newAssociation.name}
            required
          />
        </label>
        <label className="formLabel">Description:
          <input 
            type="text" 
            name="description" 
            id="description" 
            onChange={handleChange}
            value={newAssociation.description}
            required
          />
        </label>
        <label className="formLabel">Website url:
          <input 
            type="text" 
            name="link" 
            id="link" 
            onChange={handleChange} 
            value={newAssociation.link}
            required
            />
        </label>
        <label className="formLabel">
          Category: 
          <select 
            name="category" 
            id="category" 
            onChange={handleChange}
            value={newAssociation.category}
            required
          >
            <option value="Animal Protection">Animal Protection</option>
            <option value="Health">Health</option>
            <option value="Development">Development</option>
            <option value="Environment">Environment</option>
            <option value="Education">Education</option>
            <option value="Human Rights">Human Rights</option>
          </select>
        </label>
        <label className="formLabel">
          Continent:
          <select 
            name="continent" 
            id="continent" 
            onChange={handleChange}
            required
            value={newAssociation.continent}
          >
            <option value="Worldwide">Worldwide</option>
            <option value="Africa">Africa</option>
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
            <option value="Poles">Poles</option> 
          </select>
        </label>
        <label className="formLabel">Country:
          <input 
            type="text" 
            name="country" 
            id="country" 
            onChange={handleChange}
            value={newAssociation.country}
            required
          />
        </label>
        <label className="formLabel">Address to receive DAI:
          <input 
            type="text" 
            name="address" 
            id="address" 
            onChange={handleChange} 
            value={newAssociation.address}
            />
        </label>
        <label className="formLabel" >Upload logo: 
          <input
            id="file-uploaded"
            className="file-input"
            name="file" 
            type="file"
            onChange={handleLogoChange}
            />
        </label>
        <label className="formLabel">Contact's name:
          <input 
            type="text" 
            name="contactName" 
            id="contactName" 
            onChange={handleChange} 
            value={newAssociation.contactName}
            required
            />
        </label>
        <label className="formLabel">Contact's email:
          <input 
            type="text" 
            name="contactEmail" 
            id="contactEmail" 
            onChange={handleChange} 
            value={newAssociation.contactEmail}
            required
            />
        </label>
        {status === "SUCCESS" ? <p className="form-result">{responseMsg}</p> : <button className="introduction-button irrigateFormButton" type="submit">Submit Association</button>}
        {status === "ERROR" && <p className="form-result-error">{responseMsg}</p>}
      </form>
    </div>
  );
};

export default AddAssociationForm;