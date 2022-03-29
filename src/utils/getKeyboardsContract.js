import { ethers } from "ethers";

import abi from "../abi/Keyboards.json";

const contractAddress = "0xd355c17a9C82d74A158e282cc8bF924426Df036B";
const contractABI = abi.abi;

export default function getKeyboardsContract(provider) {
  if (provider) {
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    return undefined;
  }
}
