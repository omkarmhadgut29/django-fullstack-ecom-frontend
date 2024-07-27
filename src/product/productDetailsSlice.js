import { createSelector, createSlice } from "@reduxjs/toolkit";
import { getProduct } from "./productActions";

const initialState = {
    isLoading: false,
    data: null,
    isError: null,
};

const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getProduct.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getProduct.rejected, (state, action) => {
            state.isLoading = false;
            // console.log("Error: ", action.error.message);
            state.isError = action.error.message;
        });
    },
});

export const productDetailsSelector = createSelector(
    (state) => state.productDetails,
    (state) => state
);

export default productDetailsSlice.reducer;
