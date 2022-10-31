import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../interface";

export interface cartState {
  products: Array<Product>;
}

const initialState: cartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      if (
        !(state.products.filter((e) => e.id === action.payload.id).length > 0)
      ) {
        state.products = [...state.products, { ...action.payload, amount: 1 }];
        console.log(state.products);
      }
      if (state.products.filter((e) => e.id === action.payload.id).length > 0) {
        let cur = current(state);
        const index = cur.products.indexOf(
          cur.products.find(() => action.payload?.id)
        );
        console.log(cur.products[index]);
        state.products[0].amount = state.products[0].amount + 1;
      }
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
