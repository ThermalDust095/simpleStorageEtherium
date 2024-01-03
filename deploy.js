const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  //http://127.0.0.1:7545
  const provider = new ethers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/iC81kJ8l6_nS865H5oT3GmaL5RzEN15p"
  );
  const wallet = new ethers.Wallet(
    "f303593033a227b3d83f0f18c0bb409a8af78320eaac06475c57797aecb43ec3",
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
  await contract.deploymentTransaction().wait(1);
  console.log(`Contract Address: ${await contract.getAddress()}`);

  // console.log("Here is the deployment transaction: ");
  // console.log(contract.deploymentTransaction());
  // console.log("Here is the transaction receipt:");
  // console.log(deploymentReceipt);

  const transactionResponse = await contract.store("Akhil", "11");
  const transactionReceipt = await transactionResponse.wait(1);

  const updatedFavNumber = await contract.retrieve("0");
  console.log(`Details Stored: ${updatedFavNumber.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
