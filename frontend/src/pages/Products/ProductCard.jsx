import { Link } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
    const dispatch = useDispatch();

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
        toast.success("Thêm sản phẩm vào giỏ hàng thành công", {
            // position: toast.POSITION.TOP_RIGHT,
            // autoClose: 2000,
        });
    };

    return (
        <div className="w-[24rem] ml-[1rem] mt-[1rem] p-3 relative hover:shadow-lg bg-white rounded-lg">
            <section className="relative">
                <Link to={`/product/${p._id}`}>
                    <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                        {p?.brand}
                    </span>
                    <img
                        className="cursor-pointer w-full    "
                        src={p.image}
                        alt={p.name}
                        style={{ height: "240px", objectFit: "cover" }}
                    />
                </Link>
                <HeartIcon product={p} />
            </section>

            <div className="p-5">
                <div className="flex justify-between">
                    <h5 className="mb-2 text-xl text-whiet dark:text-white">
                        {p?.name}
                    </h5>
                    <p className="text-black font-semibold text-pink-500">
                        {p?.price?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </p>
                </div>

                <p className="mb-3 font-normal text-[#CFCFCF]">
                    {p?.description?.substring(0, 80)} ...
                </p>

                <section className="flex justify-between items-center">
                    <Link
                        to={`/product/${p._id}`}
                        className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 
                                focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg 
                                text-sm px-5 py-2.5 text-center inline-flex items-center 
                                dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/80 mt-2 mb-1"
                    >
                        Đọc thêm
                        <svg
                            className="w-3.5 h-3.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </Link>

                    <button
                        className="p-2 rounded-full"
                        onClick={() => addToCartHandler(p, 1)}
                    >
                        <AiOutlineShopping size={25} />
                    </button>
                </section>
            </div>
        </div>
    );
};

export default ProductCard;
