import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
    // Format price
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    return (
        <div className="w-[24rem] ml-[2rem] mt-[2rem] p-3 relative hover:shadow-lg bg-white rounded-lg">
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full rounded-lg h-[20rem] object-cover"
                />

                <HeartIcon product={product} />
            </div>

            <div className="p-4">
                <Link to={`/product/${product._id}`}>
                    <h2 className="flex justify-between items-center font-semibold tracking-tight">
                        <span className="text-[#b0b0b0]">{product.brand}</span>
                        <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                            {formatCurrency(product.price)}
                        </span>
                    </h2>
                    <h2 className="flex justify-between items-center font-semibold tracking-tight">
                        <div className="pt-4 text-lg text-gray-900">
                            {product.name}
                        </div>
                    </h2>
                </Link>
            </div>
        </div>
    );
};

export default Product;
