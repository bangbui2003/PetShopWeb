import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // cartItems: localStorage.getItem("cartItems")
  //   ? JSON.parse(localStorage.getItem("cartItems"))
  //   : [],
  // totalAmount: localStorage.getItem("totalAmount")
  //   ? localStorage.getItem("totalAmount")
  //   : 0,
  // totalQuantity: localStorage.getItem("totalQuantity")
  //   ? localStorage.getItem("totalQuantity")
  //   : 0
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
  shipInfo:null
};

const cartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems?.find(
        (item) => {
          return item.id === newItem.id;
        }
      );
      if (!existingItem) {
        state.cartItems?.push({
          id: newItem.id,
          Quantity: newItem.Quantity,
          Price: newItem.Price,
          Name: newItem.DogName || newItem.ItemName,
          Images: newItem.Images,
          type: newItem.type,
          stock: newItem?.stock
        });
      } else if (existingItem.type === "product") {
        existingItem.Quantity += newItem.Quantity;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.Price);
      }

      state.totalAmount = state.cartItems?.reduce(
        (total, item) => total + Number(item.Price) * Number(item.Quantity),
        0
      );
    },
    deleteItem: (state, action) => {
      const { id, type } = action.payload;
      if (type === "animal") {
        const existingItem = state.cartItems?.find((item) => item.id === id);
        if (existingItem) {
          state.cartItems = state.cartItems?.filter((item) => item.id !== id);
          state.totalQuantity = state.totalQuantity - existingItem.Quantity;
        }
        state.totalAmount = state.cartItems?.reduce(
          (total, item) => total + Number(item.Price) * Number(item.Quantity),
          0
        );
      } else if (type === "product") {
        const existingItem = state.cartItems?.find((item) => item.id === id);
        if (existingItem) {
          state.cartItems = state.cartItems?.filter((item) => item.id !== id);
          state.totalQuantity = state.totalQuantity - existingItem.Quantity;
        }
        state.totalAmount = state.cartItems?.reduce(
          (total, item) => total + Number(item.Price) * Number(item.Quantity),
          0
        );
      }

    },
    increase: (state, action) => {
      const id = action.payload;
      state.totalQuantity += 1;
      const selectedItem = state.cartItems?.find((item) => item.id === id);
      // If needed, add condition: quantity lower than stock remain
      selectedItem.Quantity += 1;
    },
    decrease: (state, action) => {
      const id = action.payload;
      state.totalQuantity -= 1;
      const selectedItem = state.cartItems?.find((item) => item.id === id);
      // If needed, add condition: quantity lower than stock remain
      if (selectedItem.Quantity > 1) {
        selectedItem.Quantity -= 1;
      }
    },
    calculateTotal: (state) => {
      let totalQuantity = 0;
      let totalAmount = 0;
      state.cartItems?.forEach((item) => {
        totalQuantity += item.Quantity;
        totalAmount += item.Quantity * item.Price;
      });
      state.totalAmount = totalAmount;
      state.totalQuantity = totalQuantity;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
    createShipInfo: (state, action) => {
      state.shipInfo = action.payload;
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = state.totalAmount - action.payload;
    }
  }
});

export const { clearCart, calculateTotal, increase, decrease, deleteItem, addItem
  , createShipInfo, setTotalAmount
} =
  cartSlice.actions;

export default cartSlice.reducer;