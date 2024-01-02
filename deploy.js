const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  //http://127.0.0.1:7545
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
  const wallet = new ethers.Wallet(
    "0xc2e44c4b6910ca218f8f3f4fbff1956639e53a39ce5865e3b682b46f63cba8a6",
    provider
  );

  const abi = fs.readFileSync("./simpleStorage_sol_simpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./simpleStorage_sol_simpleStorage.bin",
    "utf-8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, Please wait.....");
  const contract = await contractFactory.deploy(); //stop here, wait for contract to deploy
  const deploymentReceipt = await contract.deploymentTransaction().wait(1);
  // console.log("Here is the deployment transaction: ");
  // console.log(contract.deploymentTransaction());
  // console.log("Here is the transaction receipt:");
  // console.log(deploymentReceipt);

  const currFavouriteNumber = await contract.retrieve();
  console.log(`Favourite Number: ${currFavouriteNumber.toString()}`);

  const transactionResponse = await contract.store("Akhil", "11");
  const transactionReceipt = await transactionResponse.wait(1);

  const updatedFavNumber = await contract.retrieve();
  console.log(updatedFavNumber);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
