import config from '../config/config';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { ITransaction } from '../interfaces/Transaction';
import ecr20Contract from '../contracts/Dai.json'
import React from 'react';

const irrigateAddress = config.web3.irrigateAddress;
const erc20Address = config.web3.erc20Address;

const connectWallet = async () => {
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
        obj.connectedStatus = false;
        obj.status = "🦊 Set network to Matic.";
        alert("Metamask must be set to Matic network");
        localStorage.setItem("web3", "disconnected");
      } else {
        obj.connectedStatus = true;
        obj.status = "Connected";
        obj.networkId = networkId;
        obj.address = accounts[0];
        localStorage.setItem("web3", "connected");
      };
      return obj;
    } catch (error) {
      if (error === 4001) {
        localStorage.setItem("web3", "disconnected");
        return {
          connectedStatus: false,
          status: "Rejected by user.",
          networkId: 0,
          address: ""
        };
      } else {
        localStorage.setItem("web3", "disconnected");
        return {
          connectedStatus: false,
          status: "🦊 Connect to Metamask using the button on the top right.",
          networkId: 0,
          address: ""
        };
      };
    };
  } else {
    localStorage.setItem("web3", "disconnected");
    console.log("Metamask not found");
    return {
      connectedStatus: false,
      status: "🦊 You must install Metamask into your browser: https://metamask.io/download.html",
      networkId: 0,
      address: ""
    };
  }; 
};

const handleChainChanged = () =>{
  window.location.reload();
}

const handleAccountsChanged = (accounts: any, currentAddress: any, setter: any) => {
  if (accounts.length === 0) {
    console.log('Please connect to MetaMask.');
    localStorage.setItem("web3", "disconnected");
    window.location.reload();
  } else if (accounts[0] !== currentAddress) {
    setter(accounts[0]);
    localStorage.setItem("web3", "connected");
  };
};

const sendErc20Donation = async (tx: ITransaction) => {
  tx.amount = Web3.utils.toWei(tx.amount, 'ether'); 
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  tx.donorAddress = accounts[0];
  await fetch(config.server.serverUrl + config.server.sendDonation, {
    method: 'POST',
    body: JSON.stringify(tx),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(res => res.json()
  )
  .then(async (res) => {
    console.log(res)
    if (res.status == 201) {
      console.log("sending funds via web3")
      const web3 = new Web3(window.ethereum);
      const erc20Instance = new web3.eth.Contract(ecr20Contract.abi as AbiItem[], erc20Address);
      
      await erc20Instance.methods.transfer(irrigateAddress, tx.amount)
      .send({ from: accounts[0] })
      .on('receipt', () => {
        console.log("erc20 sent")
      })
    }
  })
}

const convertFromWei = (value: string) => {
  return parseFloat(Web3.utils.fromWei(value, 'ether')).toFixed(2);
}

const convertToWei = (value: string) => {
  return Web3.utils.toWei(value, 'ether')
}

const subscribeToEvents = async (
  newDonation: ITransaction,
  setDonationStatus: React.Dispatch<React.SetStateAction<number>>,
  retrieveAssociationsList: () => void
  ) => {
    const web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const erc20Instance = new web3.eth.Contract(ecr20Contract.abi as any, erc20Address);
    await erc20Instance.events.Transfer({
      filter: { src: accounts[0], dst: irrigateAddress },
      fromBlock: "latest"
    })
    .on("connected", () => {
      console.log("ERC20 IN LISTENER: Started");
    })
    .on('data', async (event: any) => {
      if (event.returnValues.wad == newDonation.amount.toString()) {
        console.log("Donation received");
        setDonationStatus(2);
        await erc20Instance.events.Transfer({
          filter: { src: irrigateAddress, dst: newDonation.associationAddress },
          fromBlock: "latest"
        })
        .on("connected", () => {
          console.log("ERC20 OUT LISTENER: Started");
        })
        .on('data', async () => {
          console.log("Donation transferred");
          setDonationStatus(3);
          retrieveAssociationsList();
        })
      }
  })
}

export const web3Services = {
  connectWallet,
  handleChainChanged,
  handleAccountsChanged,
  sendErc20Donation,
  convertFromWei,
  convertToWei,
  subscribeToEvents
};