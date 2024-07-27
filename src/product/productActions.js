import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("getProducts", async () => {
    const { data } = await axios.get("/api/products/");
    return data;
});

export const getProduct = createAsyncThunk("getProduct", async (id) => {
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
});
