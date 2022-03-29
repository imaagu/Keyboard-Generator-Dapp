import { useState } from "react";
import SecondaryButton from "./secondary-button";
import { ethers } from "ethers";

export default function TipButton({ keyboardsContract, index }) {
  const [mining, setMining] = useState(false);

  const submitTip = async (e) => {
    if (!keyboardsContract) {
      console.error(
        "KeyboardsContract object is required to create a keyboard"
      );
      return;
    }

    setMining(true);
    try {
      const tipTxn = await keyboardsContract.tip(index, {
        value: ethers.utils.parseEther("0.01"),
      });

      await tipTxn.wait();
      console.log("Sent tip!", tipTxn.hash);
    } catch (e) {
      setMining(false);
    }
  };

  return (
    <SecondaryButton onClick={submitTip} disabled={mining}>
      {mining ? "Tipping..." : "Tip 0.01 eth!"}
    </SecondaryButton>
  );
}
