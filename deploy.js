async function main() {
  console.log("hi");
  let variable = 5;
  console.log(variable);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
