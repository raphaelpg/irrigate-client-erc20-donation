import React, { useState } from 'react';
// import config from '../../config/config';
import { IMessage } from '../../interfaces/Message';
import messageService from '../../services/message.service';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const initialFormState = {
    "name": "", 
    "email": "",
    "message": "",
  };
  const [newMessage, setNewMessage] = useState<IMessage>(initialFormState);

  const clearContactState = () => {
    setNewMessage(initialFormState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMessage(prevNewMessage => ({
      ...prevNewMessage,
      [name]: value,
    }));
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    messageService.sendMessage(newMessage)
    .then(() => {
      clearContactState();
      setStatus('SUCCESS');
    })
    .catch(err => {
      console.log(err);
      setStatus('ERROR');
    });
  };

  return(
    <div className="contact-container">
      <div className="contact-title">
        <h2>Contact us</h2>
      </div> 
      <div className="contact-form-container">
        <form
          className="irrigateForm"
          method="post"
          onSubmit={sendMessage}
        >
          <label className="formLabel">Your name:
            <input 
              type="text" 
              name="name" 
              id="name" 
              onChange={handleChange}
              value={newMessage.name}
              required
            />
          </label>
          <label className="formLabel">Your email:
            <input 
              type="email" 
              name="email" 
              id="email" 
              onChange={handleChange}
              value={newMessage.email}
              required
            />
          </label>
          <label className="formLabel">Your message:
            <textarea 
              name="message" 
              id="message" 
              onChange={handleChange} 
              value={newMessage.message}
              required
              />
          </label>
          {status === "SUCCESS" ? <p className="form-result">Your message has been sent, we will reply soon</p> : <button className="introduction-button irrigateFormButton" type="submit">Send message</button>}
          {status === "ERROR" && <p className="form-result-error">There was an error, please try later.</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;