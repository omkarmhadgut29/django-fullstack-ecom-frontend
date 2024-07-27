import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    cartItems: [],
    isError: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find(
                (x) => x._id === item._id
            );
            if (existingItem) {
                // return {
                //     ...state,
                //     cartItems: state.cartItems.map((x) =>
                //         x._id === existingItem._id ? item : x
                //     ),
                // };
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existingItem._id ? item : x
                );
            } else {
                // return {
                //     ...state,
                //     cartItems: [...state.cartItems, item],
                // };
                state.cartItems = [...state.cartItems, item];
            }
            localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
        },

        getCartItems: (state) => {
            const localStorageItem = JSON?.parse(
                localStorage?.getItem("cartItem") || "[]"
            );
            state.cartItems = localStorageItem;
        },

        removeCartItem: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (x) => x._id !== action.payload
            );
            localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
        },
    },
});

export const { addToCart, getCartItems, removeCartItem } = cartSlice.actions;

export const cartSelector = createSelector(
    (state) => state.cart.cartItems,
    (state) => state
);

export default cartSlice.reducer;
