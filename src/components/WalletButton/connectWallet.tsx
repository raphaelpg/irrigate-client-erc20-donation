import React, { useState, useEffect } from 'react';
import { web3Services } from '../../services/web3.services';
// import React, { useState, useContext } from 'react';
// import config from '../../config/config';
// import associationService from '../../services/associations.service';

const ConnectWallet: React.FC = () => {
  const [isConnected, setConnectedStatus] = useState(false);
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const connectToWeb3 = async () => {
    const walletResponse = await web3Services.connectWallet();
    setConnectedStatus(walletResponse.connectedStatus);
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  }

  const checkWalletConnection = async () => {
    if (window.ethereum) {

      window.ethereum.on('chainChanged', web3Services.handleChainChanged);
      window.ethereum.on('accountsChanged', (accounts: any) => web3Services.handleAccountsChanged(accounts, walletAddress, setWallet));

      try {
        const networkId = window.ethereum.networkVersion;
        if (networkId == 137) {
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts.length) {
            setConnectedStatus(true);
            setWallet(accounts[0]);
          } else {
            setConnectedStatus(false);
            setStatus("🦊 Connect to Metamask using the top right button.");
          }
        } else {
          setConnectedStatus(false);
          setStatus("🦊 Set network to Matic.");
        }
      } catch {
        setConnectedStatus(false);
        setStatus("🦊 Connect to Metamask using the top right button.");
      }
    }  
  }

  useEffect(() => {
    checkWalletConnection();
  });

  return(
    <div className="walletContainer">
      { isConnected ? 
        <div className="walletStatus">Connected</div>
        :
        ""  
      }
      { isConnected ?  
        <div className="walletAddress">{walletAddress.substr(0, 6) + "..." + walletAddress.slice(-4)}</div>  
        :
        <button className="wallet-button" onClick={connectToWeb3}>Connect Wallet</button>
      }
    </div>
  );
};

export default ConnectWallet;