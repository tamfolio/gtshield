import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/Store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Replace this with your real Google OAuth Client ID
const GOOGLE_CLIENT_ID =
  "732027730242-fgibg81u8o22vrvsl2a3aofui7e6tckh.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
);
