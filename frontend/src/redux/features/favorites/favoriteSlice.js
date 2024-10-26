import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: [],
    reducers: {
        addToFavorites: (state, action) => {
            // Kiểm tra xem sản phẩm đã được yêu thích chưa
            if (!state.some((product) => product._id === action.payload._id)) {
                state.push(action.payload);
            }
        },
        removeFromFavorites: (state, action) => {
            // Xóa sản phẩm có ID trùng khớp
            return state.filter(
                (product) => product._id !== action.payload._id
            );
        },
        setFavorites: (state, action) => {
            // Đặt mục yêu thích từ localStorage
            return action.payload;
        },
    },
});

export const { addToFavorites, removeFromFavorites, setFavorites } =
    favoriteSlice.actions;
export const selectFavoriteProduct = (state) => state.favorites;
export default favoriteSlice.reducer;
