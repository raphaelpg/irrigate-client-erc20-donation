import React, { useState } from 'react';
import { navigate } from 'gatsby';
import UserService from '../../services/user.service';
import { IUser } from '../../interfaces/User';

const LoginForm: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [responseMsg, setResponseMsg] = useState<string>('');
  const [displayInputs, setDisplayInputs] = useState<boolean>(true);
  const initialUser = {
    "email": "", 
    "password": "",
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
    UserService.login(newUser)
    .then(() => {
      if (localStorage.getItem("user")) {
        let localData = JSON.parse(localStorage.getItem("user")!);
        if (localData.msg === "User authorized") {
          setResponseMsg(localData.msg)
          setStatus('SUCCESS');
          clearUserState();
          setDisplayInputs(false);
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      } else {
        setResponseMsg("Wrong password")
        setStatus('ERROR');
      }
    })
    .catch(() => {
      setResponseMsg("Wrong password");
      setStatus('ERROR');
    });
  };

  return(
    <div className="formContainer" style={{"display":"flex"}}>
      <div className="formTitle">
        <h2>Log in</h2>
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
          </div>  
        ) : (
          <></>
        )}
        {status === "SUCCESS" ? <p className="form-result">{responseMsg}</p> : <button className="introduction-button irrigateFormButton" type="submit">Log in</button>}
        {status === "ERROR" && <p className="form-result-error">{responseMsg}</p>}
      </form>
    </div>
  );
};

export default LoginForm;