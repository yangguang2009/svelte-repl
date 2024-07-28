import React, { useRef, useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";

const Editor = ({ onChange }) => {
  const editorRef = useRef(null);
  const [code, setCode] = useState(
    `<script>
	let name = 'world';
</script>

<h1>Hello {name}!</h1>`
  );

  const handleEditorChange = (value) => {
    setCode(value);
    onChange(value);
  };

  return (
    <MonacoEditor
      height="350px"
      language="html"
      value={code}
      onChange={handleEditorChange}
      editorDidMount={(editor) => {
        editorRef.current = editor;
      }}
    />
  );
};

export default Editor;
