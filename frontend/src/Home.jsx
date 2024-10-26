import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "./redux/api/productApiSlice";
import Loader from "./components/Loader";
import Message from "./components/Message";
import Header from "./components/Header";
import Product from "./pages/Products/Product";

const Home = () => {
    const { keyword } = useParams();
    const { data, isLoading, isError } = useGetProductsQuery({ keyword });

    return (
        <>
            {!keyword ? <Header /> : null}
            {isLoading ? (
                <Loader />
            ) : isError ? (
                <Message variant="danger">
                    {isError?.data.message || isError.error}
                </Message>
            ) : (
                <>
                    <div className="flex justify-around items-center mx-8">
                        <h1 className="mt-[10rem] text-[2rem] font-semibold">
                            SẢN PHẨM NỔI BẬT
                        </h1>

                        <Link
                            to="/shop"
                            className="hidden lg:block md:block bg-pink-600 font-bold rounded-full py-2 px-10 mt-[10rem]"
                        >
                            Shop
                        </Link>
                    </div>

                    <div>
                        <div className="flex justify-center flex-wrap pl-[-2rem] mx-8 my-8">
                            {data.products.map((product) => (
                                <div key={product._id}>
                                    <Product product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Home;
