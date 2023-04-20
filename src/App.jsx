import { useState } from "react";

import "./App.scss";
import PasswordDisplay from "./components/PasswordDisplay";
import PasswordGenerator from "./components/PasswordGenerator";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Password Generator</h1>
      </header>
      <main>
        <PasswordDisplay />
        <PasswordGenerator />
      </main>
    </div>
  );
}

export default App;
