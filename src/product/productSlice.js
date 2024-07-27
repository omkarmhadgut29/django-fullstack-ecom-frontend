import { createSelector, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./productActions";

const initialState = {
    isLoading: true,
    data: null,
    isError: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false;
            // console.log("Error: ", action.error.message);
            state.isError = action.error.message;
        });
    },
});

export const productSelector = createSelector(
    (state) => state.product,
    (state) => state
);

export default productSlice.reducer;
