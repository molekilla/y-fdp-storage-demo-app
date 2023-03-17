import * as Y from "yjs";
import { useState, useRef } from "react";
import "./App.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { QuillBinding } from "y-quill";
import { FdpStoragePersistence } from "y-fdp-storage";
import { Bee } from "@ethersphere/bee-js";
import { ethers } from "ethers";

// TODO: Ask for Postage Batch ID
const postageBatchId =
  process.env.BEE_POSTAGE ||
  "1c082c5e642e15d49b6689f5437c2eb9e6aa9c546a8ed1d11d0024b043bca371";

// TODO: Ask for Bee API URL
const bee = new Bee("http://localhost:1633");

const testIdentity = {
  privateKey:
    "634fb5a872396d9693e5c9f9d7233cfa93f395c093371017ff44aa9ae6564cdd",
  publicKey:
    "03c32bb011339667a487b6c1c35061f15f7edc36aa9a0f8648aba07a4b8bd741b4",
  address: "8d3766440f0d7b949a5e32995d09619a7f86e632",
};

// TODO: Wallet TODO
const wallet = ethers.Wallet.createRandom();
const topic = "/crdt/document/test";

// Create FdpStoragePersistence object
const persistence = new FdpStoragePersistence(
  bee,
  wallet,
  topic,
  postageBatchId
);

let binding: any;

const ydoc = new Y.Doc();
ydoc.on("update", (update) => {
  console.log("update", update);
  persistence.storeUpdate(update);
});

const text = ydoc.getText("quill");
function App() {
  const quillRef = useRef(null);
  const [value, setValue] = useState("");

  if (quillRef.current && binding === undefined) {
    console.log("binding", quillRef.current);
    // @ts-ignore - quillRef.current is not null
    binding = new QuillBinding(text, quillRef.current.getEditor());
  }
  return (
    <ReactQuill theme="snow" value={value} onChange={setValue} ref={quillRef} />
  );
}

export default App;
