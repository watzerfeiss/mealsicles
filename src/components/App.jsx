import React, { useState } from "react";

import Header from "./Header";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="app-container">
      <Header onSearch={(value) => setSearchTerm(value)} />
      {searchTerm && <p>Search results for {searchTerm}</p>}
    </div>
  );
}
