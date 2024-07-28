import React, { useRef, useEffect } from "react";

const Preview = ({ code }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument;
    doc.open();
    doc.write(`
            <style>${code.css ? code.css.code : ""}</style>
            <div id="app"></div>
            <script type="module">
                ${code.js ? getJsCode() : ""}
                try{
                  if (Component) {
                      new Component({ target: document.getElementById('app') });
                  }
                }catch(e){}
            </script>
        `);
    doc.close();
  }, [code]);

  function getJsCode() {
    return code.js.code
      .replace(
        "svelte/internal",
        "https://unpkg.com/svelte@4.2.18/src/runtime/internal/index.js"
      )
      .replace(
        "svelte/internal/disclose-version",
        "https://unpkg.com/svelte@4.2.18/src/runtime/internal/disclose-version/index.js"
      );
  }

  return (
    <>
      Preview
      <iframe
        ref={iframeRef}
        style={{
          width: "100%",
          height: "350px",
          border: "none",
          background: "#fff",
        }}
      />
    </>
  );
};

export default Preview;
