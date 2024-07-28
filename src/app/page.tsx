"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("./components/Editor"), { ssr: false });
const Preview = dynamic(() => import("./components/Preview"), { ssr: false });

const Home = () => {
  const [code, setCode] = useState("");
  const [compiledCode, setCompiledCode] = useState({});

  useEffect(() => {
    const worker = new Worker("/compile.worker.js");
    worker.onmessage = (event) => {
      const { result, error } = event.data;
      if (error) {
        console.error(error);
      } else {
        setCompiledCode(result);
      }
    };

    if (code) {
      worker.postMessage({ code });
    }

    return () => {
      worker.terminate();
    };
  }, [code]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: "16px",
        padding: "2rem",
        fontWeight: "bold",
      }}
    >
      <h1>Svelte REPL with Next.js</h1>
      <Editor onChange={setCode} />
      <Preview code={compiledCode} />
    </div>
  );
};

export default Home;
