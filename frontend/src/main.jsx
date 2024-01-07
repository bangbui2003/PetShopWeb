import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import theme from "./configs/theme.config.js";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading="null" persistor={persistor}>
      <CssVarsProvider theme={theme}>
        <App />
      </CssVarsProvider>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
