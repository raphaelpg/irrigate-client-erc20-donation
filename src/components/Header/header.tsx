import React, { useState, useEffect } from "react";
import { Link, navigate } from "gatsby";
import Brand from "../Brand/brand";
import UserServices from '../../services/user.service';
import ConnectWallet from '../WalletButton/connectWallet';

interface IHeaderProps {
  siteTitle: string
};

const Header: React.FC<IHeaderProps> = ({ siteTitle = '' }) => {
  const [currentUser, setCurrentUser] = useState<any>(undefined);
  
  const logout = () => {
    UserServices.logout();
    setCurrentUser(undefined);
    setTimeout(() => {
      navigate('/')
    }, 500)
  };

  useEffect(() => {
    const user = UserServices.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    };
  }, []);
  
  return (
  <header>
    <p className="demo-warning">DEMO VERSION: THIS SITE IS FOR DEMO PURPOSES, THE ASSOCIATIONS IN THE LIST BELOW ARE JUST EXAMPLES AND THEIR ADDRESSES ARE FAKE</p>
    <div className="header-elements-container">
      <Brand siteTitle={siteTitle} />
      <div className="header-right-container">
        <Link className="header-link" to="/about">About</Link>
        <Link className="header-link" to="/contact">Contact Us</Link>
        { currentUser ? (
            <div className="header-logger-container">
              <Link className="header-link" to="/account">Account</Link>
              <button className="header-button" onClick={logout}>Log out</button>
            </div>
          ) : (
            <div className="header-logger-container">
              <Link className="header-link" to="/register">Sign up</Link>
              <Link className="header-link" to="/login">Log in</Link>
            </div>
          )  
        }
        <ConnectWallet/>
      </div>
    </div>
  </header>
  );
};

export default Header;