import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/productSlice";
import productDetailsSlice from "./product/productDetailsSlice";
import cartSlice from "./product/cartSlice";

export const store = configureStore({
    reducer: {
        product: productReducer,
        productDetails: productDetailsSlice,
        cart: cartSlice,
    },
    devTools: true,
});
