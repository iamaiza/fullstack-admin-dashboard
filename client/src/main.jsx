import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/store";
import { GraphqlProvider } from "./context/GraphqlProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GraphqlProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </GraphqlProvider>
    </BrowserRouter>
  </StrictMode>
);
