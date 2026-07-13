import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";

// Theme Context
import { ThemeProvider } from "./ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>

      <BrowserRouter>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1e293b",
              color: "#fff",
              borderRadius: "12px",
            },
          }}
        />

        <App />

      </BrowserRouter>

    </ThemeProvider>
  </StrictMode>
);