import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { DataProvider } from "./context/context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DataProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </DataProvider>
);
