import React, { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");

  return (
    <>
      <h1>Mealsicles</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <p>Search results for {`'${input}'`}</p>
    </>
  );
}
