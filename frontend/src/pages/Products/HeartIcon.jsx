import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
    addToFavorites,
    removeFromFavorites,
    setFavorites,
} from "../../redux/features/favorites/favoriteSlice";

import {
    addFavoritesToLocalStorage,
    getFavoritesFromLocalStorage,
    removeFavoriteFromLocalStorage,
} from "../../Utils/localStorage";

const HeartIcon = ({ product }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites) || [];
    const isFavorites = favorites.some((p) => p._id === product._id);

    useEffect(() => {
        const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
        dispatch(setFavorites(favoritesFromLocalStorage));
    }, []);

    const toggleFavorites = () => {
        if (isFavorites) {
            dispatch(removeFromFavorites(product));
            // cũng xóa sản phẩm khỏi localStorage
            removeFavoriteFromLocalStorage(product._id);
        } else {
            dispatch(addToFavorites(product));
            // thêm sản phẩm vào localStorage nữa
            addFavoritesToLocalStorage(product);
        }
    };

    return (
        <div
            onClick={toggleFavorites}
            className="absolute top-2 right-2 cursor-pointer"
        >
            {isFavorites ? (
                <FaHeart className="text-pink-600" />
            ) : (
                <FaRegHeart className="text-[#B0B0B0]" />
            )}
        </div>
    );
};

export default HeartIcon;
