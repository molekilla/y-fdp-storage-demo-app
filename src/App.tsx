import * as Y from "yjs";
import { useState, useRef } from "react";
import "./App.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { QuillBinding } from "y-quill";

// Quill.register("modules/cursors", QuillCursors);
const ydoc = new Y.Doc();
const text = ydoc.getText("quill");
function App() {
  const quillRef = useRef(null);
  const [value, setValue] = useState("");
  const [binding, setBinding] = useState({});
  const [binded, setBinded] = useState(false);

  // if (quillRef.current && !binded) {
  //   console.log("binding", quillRef.current);
  //   // @ts-ignore - quillRef.current is not null
  //   setBinding(new QuillBinding(text, quillRef.current.getEditor()));
  //   setBinded(true);
  // }
  return (
    <ReactQuill theme="snow" value={value} onChange={setValue} ref={quillRef} />
  );
}

export default App;
