import Web3 from "web3";

//window not available for server-side rendering
// const web3 = new Web3(window.web3.currentProvider);

let web3;

//check to see if running in browser, then check if user is in window and running metamask
// if both exist, hijack metamask's and use it
if (typeof window !== "undefined" && typeof window.web3 != "undefined") {
  window.ethereum.enable();
  web3 = new Web3(window.web3.currentProvider);
} else {
  //either running on server or user not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/0704c478b4984203aea3f5685c2a1ac2"
  );
  web3 = new Web3(provider);
}

export default web3;
