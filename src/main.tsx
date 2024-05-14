import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// import router
import { BrowserRouter as Router } from "react-router-dom";

// import house context provide
import HouseContextProvider from "./components/HouseContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HouseContextProvider>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </HouseContextProvider>
);
