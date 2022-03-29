import React from "react";
import Create from "../create";
import Display from "../app";
import NavBar from "../../components/navbar";
const Main = (props) => {
  return (
    <div>
      <NavBar />
      <main className="max-w-3xl mx-auto">
        <h1 className="mt-16 mb-4 text-4xl text-indigo-900">
          Solidity Keyboard Generator
        </h1>
        {props.isForm ? <Create /> : <Display />}
      </main>
    </div>
  );
};

export default Main;
