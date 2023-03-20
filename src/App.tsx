import * as Y from "yjs";
import WifiIcon from "@mui/icons-material/Wifi";
import Button from "@mui/material/Button";
import { useState, useRef } from "react";
import "./App.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { QuillBinding } from "y-quill";
import { makePrivateKeySigner, FdpStoragePersistence } from "y-fdp-storage";
import { Bee, Utils } from "@ethersphere/bee-js";
import TextField from "@mui/material/TextField";

const postageBatchId =
  process.env.BEE_POSTAGE ||
  "1c082c5e642e15d49b6689f5437c2eb9e6aa9c546a8ed1d11d0024b043bca371";

const bee = new Bee(process.env.REACT_APP_BEE_URL || "http://localhost:1633");

let binding: any;

let ydoc = new Y.Doc();

function App() {
  const quillRef = useRef(null);
  const [value, setValue] = useState("");
  const [secretKey, setPrivateKey] = useState(
    "634fb5a872396d9693e5c9f9d7233cfa93f395c093371017ff44aa9ae6564cdd"
  );
  const [documentName, setDocumentName] = useState("/crdt/document/test1");

  async function connect() {
    const wallet = makePrivateKeySigner(Utils.hexToBytes(secretKey));
    const topic = documentName;

    // Create FdpStoragePersistence object
    const persistence = new FdpStoragePersistence(
      bee,
      wallet,
      topic,
      postageBatchId
    );
    persistence.autoUpdate(ydoc);
    const close = persistence.subscribe(ydoc);
    const text = ydoc.getText("quill");
    // @ts-ignore - quillRef.current is not null
    binding = new QuillBinding(text, quillRef.current.getEditor());
  }
  return (
    <>
      <div>
        <div>
          <TextField
            required
            onChange={(e) => {
              setPrivateKey(e.target.value);
            }}
            id="standard-required"
            label="Private Key"
            variant="standard"
          />
        </div>
        <div>
          <TextField
            required
            onChange={(e) => {
              setDocumentName(e.target.value);
            }}
            id="standard-required"
            label="Document Name"
            variant="standard"
          />
        </div>
        <Button startIcon={<WifiIcon />} variant="contained" onClick={connect}>
          Connect
        </Button>
      </div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        ref={quillRef}
      />
    </>
  );
}

export default App;
