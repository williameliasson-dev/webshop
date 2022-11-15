import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../interface";
import { stat } from "fs";

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
      console.log(cur.products);
      const product = cur.products.find((p) => action.payload.id === p.id);
      if (!product) {
        state.products = [...cur.products, { ...action.payload, amount: 1 }];
      } else {
        const index = cur.products
          .map(function (el) {
            return el.id;
          })
          .indexOf(action.payload.id);
        state.products[index].amount = ++state.products[index].amount;
      }

      let amount = state.products.reduce((prev, cur) => prev + cur.amount, 0);
      state.amount = amount;
    },
    sliceProduct: (state, action: PayloadAction<string>) => {
      let cur = current(state);
      const i = cur.products.findIndex((p) => p.id === action.payload);
      if (cur.products[i].amount > 1) {
        state.products[i].amount = cur.products[i].amount - 1;
        state.amount = state.amount - 1;
      } else {
        state.products = [
          ...state.products.slice(0, i),
          ...state.products.slice(i + 1),
        ];
        state.amount = state.amount - 1;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, sliceProduct } = cartSlice.actions;

export default cartSlice.reducer;
