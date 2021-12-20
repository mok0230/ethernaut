const { ethers } = require("ethers");
const WebSocket = require('ws');
require("dotenv").config();

const COIN_FLIP_ABI = [
  {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "inputs": [],
      "name": "consecutiveWins",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true,
      "signature": "0xe6f334d7"
  },
  {
      "inputs": [
          {
              "internalType": "bool",
              "name": "_guess",
              "type": "bool"
          }
      ],
      "name": "flip",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x1d263f67"
  }
];

const FACTOR = "57896044618658097711785492504343953926634992332820282019728792003956564819968";

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_RINKEBY_URL);
const wallet = new ethers.Wallet(process.env.RINKEBY_PRIVATE_KEY, provider);

const COIN_FLIP_ADDRESS = "0x2dE9a02F72eDE3647Ca1501fFF728EABC5d31009";

(async function main() {
  let consecutiveWins = 0;
  let lastBlockHash;

  const coinFlipContract = new ethers.Contract(COIN_FLIP_ADDRESS, COIN_FLIP_ABI, wallet);

  const wsClient = new WebSocket(process.env.ALCHEMY_WEBSOCKET_URL);

  wsClient.onopen = () => {
    wsClient.send(JSON.stringify({"jsonrpc":"2.0", "id": 1, "method": "eth_subscribe", "params": ["newHeads"]}))
  };

  wsClient.onmessage = async (evt) => { 
    consecutiveWins = parseInt((await coinFlipContract.consecutiveWins()).toString(), 10);

    console.log('consecutiveWins', consecutiveWins);

    if (consecutiveWins >= 10) {
      console.log('consecutive wins is 10!');
      process.exit(0);
    }

    const parsedMessage = JSON.parse(evt.data);
    if (parsedMessage.params && parsedMessage.params.result) {
      lastBlockHash = parsedMessage.params.result.hash;
      console.log('lastBlockHash', lastBlockHash);
      const coinFlip = ethers.BigNumber.from(lastBlockHash).div(ethers.BigNumber.from(FACTOR)).toString();
      await coinFlipContract.flip(coinFlip === "1" ? true : false);
    }
  };
})();
