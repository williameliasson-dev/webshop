import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../interface";

export interface cartState {
  products: Array<Product>;
  amount: number;
}

const initialState: cartState = {
  products: [],
  amount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      let cur = current(state);
      let amount = 0;
      try {
        if (
          !(state.products.filter((e) => e.id === action.payload.id).length > 0)
        ) {
          state.products = [
            ...state.products,
            { ...action.payload, amount: 1 },
          ];
        }
        if (
          state.products.filter((e) => e.id === action.payload.id).length > 0
        ) {
          const index = cur.products
            .map(function (el) {
              return el.id;
            })
            .indexOf(action.payload.id);
          state.products[index].amount = ++state.products[index].amount;
          console.log(cur.products);
        }
      } catch {}

      state.products.forEach((p) => (amount = amount + p.amount));
      state.amount = amount;
    },
    sliceProduct: (state, action: PayloadAction<number>) => {
      state.products = [
        ...state.products.slice(action.payload, action.payload + 1),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, sliceProduct } = cartSlice.actions;

export default cartSlice.reducer;
