import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    useGetProductDetailsQuery,
    useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const {
        data: product,
        isLoading,
        refetch,
        error,
    } = useGetProductDetailsQuery(productId);

    const { userInfo } = useSelector((state) => state.auth);
    const [createReview, { isLoading: loadingProcductReview }] =
        useCreateReviewMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await createReview({
                productId,
                rating,
                comment,
            }).unwrap();
            refetch();
            toast.success("Đã thêm đánh giá");
        } catch (error) {
            toast.error(error?.data || error.message);
        }
    };

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate("/cart");
    };

    return (
        <>
            <div>
                <Link
                    to="/"
                    className="text-black font-semibold hover:underline ml-[10rem]"
                >
                    Quay lại
                </Link>
            </div>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.message}
                </Message>
            ) : (
                <>
                    <div className="">
                        {/* <div className="flex flex-col md:flex-row lg:flex-row justify-center mx-8 my-8">
                            <div className="bg-white rounded-lg w-max">
                                <div className="w-[30rem] relative m-3 bg-white border-solid border-[1px] rounded-lg">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full xl:w-[50rem] lg:w-[40rem] md:w-[20rem] sm:w-[30rem] mr-[2rem] rounded-lg"
                                    />

                                    <HeartIcon product={product} />
                                </div>
                            </div>

                            <div className="flex flex-col justify-between w-max">
                                <div className="lg:w-[40rem] md:w-full ml-[2rem] p-3 bg-white rounded-lg">
                                    <h2 className="text-2xl font-semibold">
                                        {product.name}
                                    </h2>
                                    <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0] bg-[#f5f5fa]">
                                        {product.description}
                                    </p>

                                    <p className="text-5xl my-4 font-extrabold text-[#B0B0B0]">
                                        {product.price}đ
                                    </p>

                                    <div className="flex items-center justify-between w-[20rem]">
                                        <div className="one">
                                            <h1 className="flex items-center mb-6">
                                                <FaStore className="mr-2 text-[#B0B0B0]" />{" "}
                                                Thương hiệu: {product.brand}
                                            </h1>
                                            <h1 className="flex items-center mb-6 w-[20rem]">
                                                <FaClock className="mr-2 text-[#B0B0B0]" />{" "}
                                                Đã thêm:{" "}
                                                {moment(
                                                    product.createAt
                                                ).fromNow()}
                                            </h1>
                                            <h1 className="flex items-center mb-6">
                                                <FaStar className="mr-2 text-[#B0B0B0]" />{" "}
                                                Đánh giá: {product.numReviews}
                                            </h1>
                                        </div>

                                        <div className="two">
                                            <h1 className="flex items-center mb-6">
                                                <FaStar className="mr-2 text-[#B0B0B0]" />{" "}
                                                Xếp hạng: {product.rating}
                                            </h1>
                                            <h1 className="flex items-center mb-6">
                                                <FaShoppingCart className="mr-2 text-[#B0B0B0]" />{" "}
                                                Quantity: {product.quantity}
                                            </h1>
                                            <h1 className="flex items-center mb-6 w-[10rem]">
                                                <FaBox className="mr-2 text-[#B0B0B0]" />{" "}
                                                In Stock: {product.countInStock}
                                            </h1>
                                        </div>
                                    </div>

                                    <div className="flex justify-between flex-wrap">
                                        <Ratings
                                            value={product.rating}
                                            text={`${product.numReviews} reviews`}
                                        />

                                        {product.countInStock > 0 && (
                                            <div>
                                                <select
                                                    value={qty}
                                                    onChange={(e) =>
                                                        setQty(e.target.value)
                                                    }
                                                    className="p-2 w-[6rem] rounded-lg text-black"
                                                >
                                                    {[
                                                        ...Array(
                                                            product.countInStock
                                                        ).keys(),
                                                    ].map((x) => (
                                                        <option
                                                            key={x + 1}
                                                            value={x + 1}
                                                        >
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                    </div>

                                    <div className="btn-container">
                                        <button
                                            // onClick={addToCartHandler}
                                            disabled={
                                                product.countInStock === 0
                                            }
                                            className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0"
                                        >
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        <div className="flex flex-col md:flex-row justify-center mx-8 my-8 bg-white rounded-lg">
                            <div className="bg-white rounded-lg w-full max-w-[28rem] md:max-w-[30rem] lg:max-w-[40rem] relative m-3">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-auto rounded-lg border border-gray-300 "
                                />
                                <HeartIcon
                                    product={product}
                                    className="absolute top-3 right-3"
                                />
                            </div>

                            <div className="flex flex-col justify-between w-full md:max-w-[40rem] lg:max-w-[50rem] p-3 bg-white rounded-lg ml-0 md:ml-4">
                                <h2 className="text-2xl font-semibold">
                                    {product.name}
                                </h2>
                                <p className="my-4 text-[#B0B0B0] bg-[#f5f5fa] p-2 rounded-lg">
                                    {product.description}
                                </p>

                                <p className="text-5xl my-4 font-extrabold text-[#B0B0B0]">
                                    {product.price}đ
                                </p>

                                <div className="flex flex-col md:flex-row justify-between">
                                    <div className="flex flex-col">
                                        <h1 className="flex items-center mb-2">
                                            <FaStore className="mr-2 text-[#B0B0B0]" />
                                            Thương hiệu: {product.brand}
                                        </h1>
                                        <h1 className="flex items-center mb-2">
                                            <FaClock className="mr-2 text-[#B0B0B0]" />
                                            Đã thêm:{" "}
                                            {moment(product.createAt).fromNow()}
                                        </h1>
                                        <h1 className="flex items-center mb-2">
                                            <FaStar className="mr-2 text-[#B0B0B0]" />
                                            Đánh giá: {product.numReviews}
                                        </h1>
                                    </div>

                                    <div className="flex flex-col">
                                        <h1 className="flex items-center mb-2">
                                            <FaStar className="mr-2 text-[#B0B0B0]" />
                                            Xếp hạng: {product.rating}
                                        </h1>
                                        <h1 className="flex items-center mb-2">
                                            <FaShoppingCart className="mr-2 text-[#B0B0B0]" />
                                            Quantity: {product.quantity}
                                        </h1>
                                        <h1 className="flex items-center mb-2">
                                            <FaBox className="mr-2 text-[#B0B0B0]" />
                                            In Stock: {product.countInStock}
                                        </h1>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center flex-wrap mt-4">
                                    <Ratings
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                    />

                                    {product.countInStock > 0 && (
                                        <select
                                            value={qty}
                                            onChange={(e) =>
                                                setQty(e.target.value)
                                            }
                                            className="p-2 w-[6rem] rounded-lg text-black"
                                        >
                                            {[
                                                ...Array(
                                                    product.countInStock
                                                ).keys(),
                                            ].map((x) => (
                                                <option
                                                    key={x + 1}
                                                    value={x + 1}
                                                >
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <button
                                        onClick={addToCartHandler}
                                        disabled={product.countInStock === 0}
                                        className="bg-pink-600 text-white py-2 px-4 rounded-lg"
                                    >
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
                            <ProductTabs
                                loadingProcductReview={loadingProcductReview}
                                userInfo={userInfo}
                                submitHandler={submitHandler}
                                rating={rating}
                                setRating={setRating}
                                comment={comment}
                                setComment={setComment}
                                product={product}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ProductDetails;
