import React from 'react';
import Web3 from 'web3';
// import React, { useState, useContext } from 'react';
// import config from '../../config/config';
// import associationService from '../../services/associations.service';

const ConnectWallet: React.FC = () => {

  const connectToWeb3 = async () => {
    console.log("connecting to web3")
    console.log("1")
    if (window.ethereum) {
      console.log("2")
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        console.log(web3.eth.accounts)
        return web3;
      } catch (error) {
        console.error(error);
      }
    }
    else if (window.web3) {
      console.log("3")
      const web3 = window.web3;
      console.log('Injected web3 detected.');
      console.log(web3.eth.accounts)
      return web3;
    }
    else {
      console.log("4")
      const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
      const web3 = new Web3(provider);
      console.log('No web3 instance injected, using Local web3.');
      return web3;
    }
  }

  return(
    <div className="walletButton">
      <button onClick={connectToWeb3}>Connect Wallet</button> 
    </div>
  );
};

export default ConnectWallet;