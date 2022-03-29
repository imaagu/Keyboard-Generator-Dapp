import React, { useState, useEffect } from "react";
import PrimaryButton from "../components/primary-button";

import Keyboard from "../components/keyboard";
import TipButton from "../components/tip-button";
import getKeyboardsContract from "../utils/getKeyboardsContract";
import { UserCircleIcon } from "@heroicons/react/solid";
import { toast } from "react-hot-toast";

import { useWeb3 } from "@3rdweb/hooks";

import { ethers } from "ethers";

const App = () => {
  const { address, provider } = useWeb3();
  const keyboardsContract = getKeyboardsContract(provider);
  const [keyboards, setKeyboards] = useState([]);
  const [keyboardsLoading, setKeyboardsLoading] = useState(false);

  const addressesEqual = (addr1, addr2) => {
    if (!addr1 || !addr2) return false;
    return addr1.toUpperCase() === addr2.toUpperCase();
  };

  const getKeyboards = async () => {
    if (keyboardsContract && address) {
      setKeyboardsLoading(true);
      try {
        const keyboards = await keyboardsContract.getKeyboards();
        console.log("Retrieved keyboards...", keyboards);
        setKeyboards(keyboards);
        setKeyboardsLoading(false);
      } catch (e) {
        setKeyboardsLoading(false);
      }
    }
  };

  const addContractEventHandlers = () => {
    if (keyboardsContract && address) {
      keyboardsContract.on("KeyboardCreated", async (keyboard) => {
        if (address && !addressesEqual(keyboard.owner, address)) {
          toast("Somebody created a new keyboard!", {
            id: JSON.stringify(keyboard),
          });
        }
        await getKeyboards();
      });

      keyboardsContract.on("TipSent", (recipient, amount) => {
        if (addressesEqual(recipient, address)) {
          toast(
            `You received a tip of ${ethers.utils.formatEther(amount)} eth!`,
            { id: recipient + amount }
          );
        }
      });
    }
  };

  useEffect(addContractEventHandlers, [!!keyboardsContract, address]);

  useEffect(() => getKeyboards(), [!!keyboardsContract, address]);

  if (!provider) {
    return <p>Please install Wallet to connect to this site</p>;
  }

  if (!address) {
    return (
      <PrimaryButton onClick={() => {}}>Connect your Wallet</PrimaryButton>
    );
  }

  if (keyboards.length > 0) {
    return (
      <div className="flex flex-col gap-4">
        <PrimaryButton type="link" href="/create">
          Create a Keyboard!
        </PrimaryButton>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
          {keyboards.map(([kind, isPBT, filter, owner], i) => (
            <div key={i} className="relative">
              <Keyboard kind={kind} isPBT={isPBT} filter={filter} />
              <span className="absolute top-1 right-6">
                {addressesEqual(owner, address) ? (
                  <UserCircleIcon className="h-5 w-5 text-indigo-100" />
                ) : (
                  <TipButton keyboardsContract={keyboardsContract} index={i} />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (keyboardsLoading) {
    return (
      <div className="flex flex-col gap-4">
        <PrimaryButton type="link" href="/create">
          Create a Keyboard!
        </PrimaryButton>
        <p>Loading Keyboards...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <PrimaryButton type="link" href="/create">
        Create a Keyboard!
      </PrimaryButton>
      <p>No keyboards yet!</p>
    </div>
  );
};

export default App;
