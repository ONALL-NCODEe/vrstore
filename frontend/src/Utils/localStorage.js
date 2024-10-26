// Thêm sản phẩm vào localStorage
export const addFavoritesToLocalStorage = (product) => {
    const favorites = getFavoritesFromLocalStorage();
    if (!favorites.some((p) => p._id === product._id)) {
        favorites.push(product);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
};

// Xóa sản phẩm khỏi localStorage
export const removeFavoriteFromLocalStorage = (productId) => {
    const favorites = getFavoritesFromLocalStorage();
    const updateFavorites = favorites.filter(
        (product) => product._id !== productId
    );

    localStorage.setItem("favorites", JSON.stringify(updateFavorites));
};

// Lấy mục yêu thích từ bộ nhớ cục bộ
export const getFavoritesFromLocalStorage = () => {
    const favoritesJSON = localStorage.getItem("favorites");
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};
