import * as Y from "yjs";
import { useState, useRef } from "react";
import "./App.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { QuillBinding } from "y-quill";

let binding: any;
// Quill.register("modules/cursors", QuillCursors);
const ydoc = new Y.Doc();
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
