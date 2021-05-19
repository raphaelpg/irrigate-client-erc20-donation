import React, { useState } from 'react';
import UserService from '../../services/user.service';
import { navigate } from 'gatsby';
import { IUser } from '../../interfaces/User';

const RegisterForm: React.FC = () => {
  const passwordMinLenght = 5;
  const [status, setStatus] = useState<string>('');
  const [responseMsg, setResponseMsg] = useState<string>('');
  const [displayInputs, setDisplayInputs] = useState<boolean>(true);
  const initialUser = {
    "email": "", 
    "password": "",
    "passwordConfirmation": "",
  };

  const [newUser, setNewUser] = useState<IUser>(initialUser);

  const clearUserState = () => {
    setNewUser(initialUser);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prevNewUser => ({
      ...prevNewUser,
      [name]: value,
    }));
  };

  const sendUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newUser.password.length >= passwordMinLenght) {
      if (newUser.password === newUser.passwordConfirmation) {
        UserService.register(newUser)
        .then(res => res.json())
        .then(result => {
          if (result.msg === "User created") {
            clearUserState();
            setStatus('SUCCESS');
            setResponseMsg(result.msg);
            setDisplayInputs(false);
            UserService.login(newUser)
            .then(() => {
              if (localStorage.getItem("user")) {
                let localData = JSON.parse(localStorage.getItem("user")!);
                if (localData.msg === "User authorized") {
                  setTimeout(() => {
                    navigate('/');
                  }, 1000)
                }
              }
            })
          } else {
            setResponseMsg(result.msg);
            setStatus('ERROR');
          }
        })
        .catch(err => {
          console.log(err);
          setResponseMsg("There was an error, please try later.");
          setStatus('ERROR');
        });
      } else {
        setResponseMsg("Passwords are differents.");
        setStatus('ERROR');
      };
    } else {
      setResponseMsg(`Password's length must be greater than ${passwordMinLenght} characters.`);
      setStatus('ERROR');
    };
  };

  return(
    <div className="formContainer" style={{"display":"flex"}}>
      <div className="formTitle">
        <h2>Sign up</h2>
      </div> 
      <form
        className="irrigateForm"
        method="post"
        onSubmit={sendUser}
      >
        {displayInputs ? (
          <div>
            <label className="formLabel">Email:
              <input 
                type="text" 
                name="email" 
                id="email" 
                onChange={handleChange}
                value={newUser.email}
                required
              />
            </label>
            <label className="formLabel">Password:
              <input 
                type="password" 
                name="password" 
                id="password" 
                onChange={handleChange}
                value={newUser.password}
                required
              />
            </label>
            <label className="formLabel">Password confirmation:
              <input 
                type="password" 
                name="passwordConfirmation" 
                id="passwordConfirmation" 
                onChange={handleChange} 
                value={newUser.passwordConfirmation}
                required
              />
            </label>
          </div>
        ) : (
          <></>
        )}
        {status === "SUCCESS" ? <p className="form-result">{responseMsg}</p> : <button className="introduction-button irrigateFormButton" type="submit">Submit</button>}
        {status === "ERROR" && <p className="form-result-error">{responseMsg}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;