import { createContext, useContext } from "react";
import { useWeb3 } from "@3rdweb/hooks";

const MetaMaskAccountContext = createContext();

export default function MetaMaskAccountProvider({ children }) {
  const { address, chainId, connectWallet, disconnectWallet, provider } =
    useWeb3();
  console.log(useWeb3());

  const value = {
    connectWallet,
    address,
    provider,
  };

  return (
    <MetaMaskAccountContext.Provider value={value}>
      {children}
    </MetaMaskAccountContext.Provider>
  );
}

export function useMetaMaskAccount() {
  return useContext(MetaMaskAccountContext);
}
