const { ethers } = require("ethers");
require("dotenv").config();
const telephoneJson = require("../artifacts/contracts/Telephone.sol/Telephone.json");

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_RINKEBY_URL);
const wallet = new ethers.Wallet(process.env.RINKEBY_PRIVATE_KEY, provider);

const TELEPHONE_ADDRESS = "0xCd7fED2aa2910A75E47E6d6d90c8F903BD95d5a2";

(async function main() {
  const ethernautTelephoneContract = new ethers.Contract(TELEPHONE_ADDRESS, telephoneJson.abi, wallet);
  await ethernautTelephoneContract.changeEthernautTelephoneOwner();
})();
