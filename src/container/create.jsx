import React, { useState } from "react";
import PrimaryButton from "../components/primary-button";
import { useHistory } from "react-router-dom";
import getKeyboardsContract from "../utils/getKeyboardsContract";

import { useWeb3 } from "@3rdweb/hooks";

const Create = () => {
  const { provider } = useWeb3();
  const history = useHistory();
  const keyboardsContract = getKeyboardsContract(provider);
  const [keyboardKind, setKeyboardKind] = useState(0);
  const [isPBT, setIsPBT] = useState(false);
  const [filter, setFilter] = useState("");
  const [adding, setAdding] = useState(false);

  const submitCreate = async (e) => {
    e.preventDefault();
    if (!keyboardsContract) return;
    try {
      setAdding(true);
      const createTxn = await keyboardsContract.create(
        keyboardKind,
        isPBT,
        filter
      );
      await createTxn.wait();
      setAdding(false);
      history.push("/");
    } catch (e) {
      setAdding(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-8">
      <form className="mt-8 flex flex-col gap-y-6">
        <div>
          <label
            htmlFor="keyboard-type"
            className="block text-sm font-medium text-gray-700"
          >
            Keyboard Type
          </label>
          <select
            id="keyboard-type"
            name="keyboard-type"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={keyboardKind}
            onChange={(e) => {
              setKeyboardKind(e.target.value);
            }}
          >
            <option value="0">60%</option>
            <option value="1">75%</option>
            <option value="2">80%</option>
            <option value="3">ISO-105</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="keycap-type"
            className="block text-sm font-medium text-gray-700"
          >
            Keycap Type
          </label>
          <select
            id="keycap-type"
            name="keycap-type"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={isPBT ? "pbt" : "abs"}
            onChange={(e) => {
              setIsPBT(e.target.value === "pbt");
            }}
          >
            <option value="abs">ABS</option>
            <option value="pbt">PBT</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="filter"
            className="block text-sm font-medium text-gray-700"
          >
            Filter
          </label>
          <select
            id="filter"
            name="filter"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            value={filter}
          >
            <option value="">None</option>
            <option value="sepia">Sepia</option>
            <option value="grayscale">Grayscale</option>
            <option value="invert">Invert</option>
            <option value="hue-rotate-90">Hue Rotate (90°)</option>
            <option value="hue-rotate-180">Hue Rotate (180°)</option>
          </select>
        </div>

        <PrimaryButton type="submit" onClick={submitCreate}>
          {adding ? "Creating.." : "Create Keyboard!"}
        </PrimaryButton>
      </form>
    </div>
  );
};

export default Create;