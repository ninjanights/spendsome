import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RegisterProvider } from "./contexts/RegisterContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RegisterProvider>
      <App />
    </RegisterProvider>
  </StrictMode>
);
