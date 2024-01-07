import { configureStore } from "@reduxjs/toolkit";
import globalLoadingSlice from "./features/globalLoadingSlice";
import appStateSlice from "./features/appStateSlice";
import userSlice from "./features/userSlice";
import authModalSlice from "./features/authModalSlice";
import cartSlice from "./features/cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// redux-persist
const commonConfig = {
  key: "petshop/user",
  storage
};

const userConfig = {
  ...commonConfig,
  whitelist: ["user", "token"]
};

const cartConfig = {
  key: "petshop/cart",
  storage,
  whitelist: ["cartItems", "totalAmount", "shipInfo"]
};

export const store = configureStore({
  reducer: {
    globalLoading: globalLoadingSlice,
    appState: appStateSlice,
    user: persistReducer(userConfig, userSlice),
    // user: userSlice,
    authModal: authModalSlice,
    // cart: cartSlice
    cart: persistReducer(cartConfig, cartSlice)
  }
});

export const persistor = persistStore(store);