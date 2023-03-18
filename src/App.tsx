import * as Y from "yjs";
import { useState, useRef } from "react";
import "./App.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { QuillBinding } from "y-quill";
import { makePrivateKeySigner, FdpStoragePersistence } from "y-fdp-storage";
import { Bee, Utils } from "@ethersphere/bee-js";
import { ethers } from "ethers";

const postageBatchId =
  process.env.BEE_POSTAGE ||
  "1c082c5e642e15d49b6689f5437c2eb9e6aa9c546a8ed1d11d0024b043bca371";

const bee = new Bee(process.env.REACT_APP_BEE_URL || "http://localhost:1633");

// TODO: Wallet TODO
const wallet = makePrivateKeySigner(
  Utils.hexToBytes(
    "634fb5a872396d9693e5c9f9d7233cfa93f395c093371017ff44aa9ae6564cdd"
  )
);
const topic = "/crdt/document/test1";

// Create FdpStoragePersistence object
const persistence = new FdpStoragePersistence(
  bee,
  wallet,
  topic,
  postageBatchId
);

let binding: any;

const ydoc = new Y.Doc();
ydoc.on("update", async (update) => {
  await persistence.storeUpdate(update);
});
const close = persistence.subscribe(ydoc);
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
