import Web3 from "web3";

const web3 = new Web3(window.web3.currentProvider);

web3.eth.getAccounts().then(console.log);




// export default web3 # to access outside