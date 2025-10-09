import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MyToken20251009095148Module", (m) => {
  // Deploy the MyToken20251009095148 contract with constructor parameters:
  // - name: The name of your token (e.g., "My Token")
  // - symbol: The symbol of your token (e.g., "MTK")
  // - initialSupply: Initial supply in whole tokens (e.g., 1000000)
  // - initialOwner: Address that will receive the initial supply and have owner privileges

  // EDIT THESE VALUES with your desired parameters
  const tokenName = "My Token";
  const tokenSymbol = "MTK";
  const initialSupply = 1000000; // 1 million tokens
  const initialOwner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // Replace with your wallet address

  const myToken = m.contract("MyToken20251009095148", [
    tokenName,
    tokenSymbol,
    initialSupply,
    initialOwner
  ]);

  return { myToken };
});