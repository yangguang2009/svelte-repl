self.onmessage = async (event) => {
  const svelteUrl = "https://unpkg.com/svelte";
  const version = "4.2.18";
  const compiler = await fetch(`${svelteUrl}/compiler.cjs`).then((r) =>
    r.text()
  );
  (0, eval)(compiler + "\n//# sourceURL=compiler.cjs@" + version);

  const { code } = event.data;
  try {
    const result = svelte.compile(code, { format: "esm" });
    self.postMessage({ result });
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};
