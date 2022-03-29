import React from "react";
import { ConnectWallet } from "@3rdweb/react";

const NavBar = () => {
  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg">
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <div className="container-fluid">
          <span className="text-xl text-black">KG</span>
        </div>
        <div className="flex items-center relative">
          <ConnectWallet />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
