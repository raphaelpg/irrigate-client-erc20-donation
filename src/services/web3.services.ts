import config from '../config/config';

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const networkId = window.ethereum.networkVersion;
      const obj = {
        connectedStatus: false,
        status: "",
        networkId: 0,
        address: ""
      };
      if (networkId != config.web3.networkId) {
        obj.connectedStatus = false,
        obj.status = "🦊 Set network to Matic."
        alert("Metamask must be set to Matic network")
      } else {
        obj.connectedStatus = true,
        obj.status = "Connected",
        obj.networkId = networkId,
        obj.address = accounts[0]
      };
      return obj;
    } catch (error) {
      if (error === 4001) {
        return {
          connectedStatus: false,
          status: "Rejected by user.",
          networkId: 0,
          address: ""
        };
      } else {
        return {
          connectedStatus: false,
          status: "🦊 Connect to Metamask using the button on the top right.",
          networkId: 0,
          address: ""
        };
      };
    };
  } else {
    console.log("Metamask not found");
    return {
      connectedStatus: false,
      status: "🦊 You must install Metamask into your browser: https://metamask.io/download.html",
      networkId: 0,
      address: ""
    };
  }; 
};

export const handleChainChanged = () =>{
  window.location.reload();
}

export const handleAccountsChanged = (accounts: any, currentAddress: any, setter: any) => {
  if (accounts.length === 0) {
    console.log('Please connect to MetaMask.');
    window.location.reload();
  } else if (accounts[0] !== currentAddress) {
    setter(accounts[0]);
  };
};

export const web3Services = {
  connectWallet,
  handleChainChanged,
  handleAccountsChanged
};