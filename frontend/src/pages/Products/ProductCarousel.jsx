import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";
import moment from "moment";
import "moment/locale/vi"; // Nhập ngôn ngữ tiếng Việt
moment.locale("vi"); // Thiết lập ngôn ngữ
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore,
} from "react-icons/fa";

const TimeAgo = ({ createdAt }) => {
    return <div>{moment(createdAt).fromNow()}</div>;
};

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery();

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="mb-4 xl:block lg:block md:block">
            {isLoading ? null : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.message}
                </Message>
            ) : (
                <Slider
                    {...settings}
                    className="xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
                >
                    {products.map(
                        ({
                            image,
                            _id,
                            name,
                            price,
                            description,
                            brand,
                            createAt,
                            numReviews,
                            rating,
                            quantity,
                            countInStock,
                        }) => (
                            <div key={_id}>
                                <img
                                    src={image}
                                    alt={name}
                                    className="w-full rounded-lg object-cover h-[30rem]"
                                />

                                <div className="flex justify-between w-[20rem]">
                                    <div className="one">
                                        <h2>{name}</h2>
                                        <p>{price}</p> <br />
                                        <p className="w-[25rem]">
                                            {description.substring(0, 170)} ...
                                        </p>
                                    </div>
                                    <div className="flex justify-between w-[20rem] ">
                                        <div className="one">
                                            <h1 className="flex items-center md-6 w-[10rem]">
                                                <FaStore className="mr-2 text-black" />{" "}
                                                Brand: {brand}
                                            </h1>
                                            <h1 className="flex items-center md-6 w-[14rem]">
                                                <FaClock className="mr-2 text-black" />{" "}
                                                Added:{" "}
                                                {moment(createAt).fromNow()}
                                            </h1>
                                            <h1 className="flex items-center md-6 w-[10rem]">
                                                <FaStar className="mr-2 text-black" />{" "}
                                                Reviews: {numReviews}
                                            </h1>
                                        </div>

                                        <div className="two">
                                            <h1 className="flex items-center mb-6 w-[10rem]">
                                                <FaStar className="mr-2 text-black" />{" "}
                                                Rating:{""} {Math.round(rating)}
                                            </h1>
                                            <h1 className="flex items-center mb-6 w-[10rem]">
                                                <FaShoppingCart className="mr-2 text-black" />{" "}
                                                Quantity: {quantity}
                                            </h1>
                                            <h1 className="flex items-center mb-6 w-[10rem]">
                                                <FaBox className="mr-2 text-black" />{" "}
                                                In Stock: {countInStock}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </Slider>
            )}
        </div>
    );
};

export default ProductCarousel;