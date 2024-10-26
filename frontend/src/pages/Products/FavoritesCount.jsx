import { useSelector } from "react-redux";

useSelector;

const FavoritesCount = () => {
    const favorites = useSelector((state) => state.favorites);
    const FavoritesCount = favorites.length;

    return (
        <div className="absolute left-2 top-8">
            {FavoritesCount > 0 && (
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                    {FavoritesCount}
                </span>
            )}
        </div>
    );
};

export default FavoritesCount;
