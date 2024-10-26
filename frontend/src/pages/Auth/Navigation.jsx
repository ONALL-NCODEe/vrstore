import { useState } from "react";
import {
    AiOutlineHome,
    AiOutlineShopping,
    AiOutlineLogin,
    AiOutlineUserAdd,
    AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const closeSidebar = () => {
        setShowSidebar(false);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            style={{ zIndex: 999 }}
            className={`${
                showSidebar ? "hidden" : "flex"
            } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4
            text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}
            id="navigation-container"
        >
            <div className="flex flex-col justify-center space-y-4">
                <Link
                    to="/"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">
                        Trang Chủ
                    </span>{" "}
                </Link>
                <Link
                    to="/shop"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">
                        Cửa Hàng
                    </span>{" "}
                </Link>
                <Link
                    to="/cart"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <AiOutlineShoppingCart
                        className="mr-2 mt-[3rem]"
                        size={26}
                    />
                    <span className="hidden nav-item-name mt-[3rem]">
                        Giỏ Hàng
                    </span>{" "}
                </Link>
                <Link
                    to="/favorite"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <FaHeart className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">
                        Yêu Thích
                    </span>{" "}
                    <FavoritesCount />
                </Link>
            </div>

            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="flex items-center text-gray-800 focus:outline-none"
                >
                    {userInfo ? (
                        <span className="text-white">{userInfo.username}</span>
                    ) : (
                        <></>
                    )}

                    {userInfo && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 ml-1 ${
                                dropdownOpen ? "transform rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={
                                    dropdownOpen
                                        ? "M5 15l7-7 7 7"
                                        : "M19 9l-7 7-7-7"
                                }
                            />
                        </svg>
                    )}
                </button>
                {dropdownOpen && userInfo && (
                    <ul
                        className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${
                            !userInfo.isAdmin ? "-top-20" : "-top-80"
                        }`}
                    >
                        {userInfo.isAdmin && (
                            <>
                                <li>
                                    <Link
                                        to="/admin/dashboard"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Bảng điều khiển
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/productlist"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Sản phẩm
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/categorylist"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Quản lý danh mục
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/orderlist"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Hóa đơn
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/userlist"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Người dùng
                                    </Link>
                                </li>
                            </>
                        )}

                        <li>
                            <Link
                                to="/profile"
                                className="block px-4 py-2 hover:bg-gray-100"
                            >
                                Thông tin cá nhân
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={logoutHandler}
                                className="block px-4 py-2 hover:bg-gray-100"
                            >
                                Đăng xuất
                            </Link>
                        </li>
                    </ul>
                )}

                {!userInfo && (
                    <ul>
                        <li>
                            <Link
                                to="/login"
                                className="flex items-center transition-transform transform hover:translate-x-2"
                            >
                                <AiOutlineLogin
                                    className="mr-2 mt-[3rem]"
                                    size={26}
                                />
                                <span className="hidden nav-item-name mt-[3rem]">
                                    Đăng Nhập
                                </span>{" "}
                            </Link>
                            <Link
                                to="/register"
                                className="flex items-center transition-transform transform hover:translate-x-2"
                            >
                                <AiOutlineUserAdd
                                    className="mr-2 mt-[3rem]"
                                    size={26}
                                />
                                <span className="hidden nav-item-name mt-[3rem]">
                                    Đăng Ký
                                </span>{" "}
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>

        //! Nav top //
        // <div>
        //     <nav class="bg-[#212425] border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        //         <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 text-white">
        //             <a
        //                 href="#"
        //                 class="flex items-center space-x-3 rtl:space-x-reverse"
        //             >
        //                 <img
        //                     src="https://flowbite.com/docs/images/logo.svg"
        //                     class="h-8"
        //                     alt="Flowbite Logo"
        //                 />
        //                 <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        //                     Flowbite
        //                 </span>
        //             </a>

        //             <div
        //                 class="hidden w-full md:block md:w-auto"
        //                 id="navbar-multi-level"
        //             >
        //                 <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#212425] dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        //                     <li>
        //                         <Link to="/" className="">
        //                             <span className=" nav-item-name mt-[3rem]">
        //                                 Trang Chủ
        //                             </span>{" "}
        //                         </Link>
        //                     </li>
        //                     <li>
        //                         <Link to="/shop" className="">
        //                             <span className="nav-item-name mt-[3rem]">
        //                                 Cửa Hàng
        //                             </span>{" "}
        //                         </Link>
        //                     </li>
        //                     <li>
        //                         <Link to="/favorite" className="">
        //                             <span className="nav-item-name mt-[3rem]">
        //                                 Yêu Thích
        //                             </span>{" "}
        //                         </Link>
        //                     </li>
        //                 </ul>
        //             </div>

        //             <div>
        //                 <button
        //                     onClickCapture={toggleMenu}
        //                     data-collapse-toggle="navbar-multi-level"
        //                     type="button"
        //                     class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        //                     aria-controls="navbar-multi-level"
        //                     aria-expanded="false"
        //                 >
        //                     <span class="sr-only">Open main menu</span>
        //                     <svg
        //                         class="w-5 h-5"
        //                         aria-hidden="true"
        //                         xmlns="http://www.w3.org/2000/svg"
        //                         fill="none"
        //                         viewBox="0 0 17 14"
        //                     >
        //                         <path
        //                             stroke="currentColor"
        //                             stroke-linecap="round"
        //                             stroke-linejoin="round"
        //                             stroke-width="2"
        //                             d="M1 1h15M1 7h15M1 13h15"
        //                         />
        //                     </svg>
        //                 </button>

        //                 {isOpen && (
        //                     <div className="absolute left-0 mt-2 bg-white border border-gray-300 shadow-lg">
        //                         <ul>
        //                             <li className="p-2 hover:bg-gray-100">
        //                                 Item 1
        //                             </li>
        //                             <li className="p-2 hover:bg-gray-100">
        //                                 Item 2
        //                             </li>
        //                             <li className="p-2 hover:bg-gray-100">
        //                                 Item 3
        //                             </li>
        //                         </ul>
        //                     </div>
        //                 )}

        //                 <div className="relative">
        //                     <button
        //                         onClick={toggleDropdown}
        //                         className="flex items-center text-gray-800 focus:outline-none mt-[-1px]"
        //                     >
        //                         {userInfo ? (
        //                             <span className="text-white">
        //                                 {userInfo.username}
        //                             </span>
        //                         ) : (
        //                             <></>
        //                         )}

        //                         {userInfo && (
        //                             <svg
        //                                 xmlns="http://www.w3.org/2000/svg"
        //                                 className={`h-4 w-4 ml-1 ${
        //                                     dropdownOpen
        //                                         ? "transform rotate-180"
        //                                         : ""
        //                                 }`}
        //                                 fill="none"
        //                                 viewBox="0 0 24 24"
        //                                 stroke="white"
        //                             >
        //                                 <path
        //                                     strokeLinecap="round"
        //                                     strokeLinejoin="round"
        //                                     strokeWidth="2"
        //                                     d={
        //                                         dropdownOpen
        //                                             ? "M5 15l7-7 7 7"
        //                                             : "M19 9l-7 7-7-7"
        //                                     }
        //                                 />
        //                             </svg>
        //                         )}
        //                         <ul className="flex flex-wrap font-medium p-4 md:p-0 ml-4  border-gray-100 rounded-lg text-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#212425] dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        //                             <li>
        //                                 <Link to="/cart" className="">
        //                                     <AiOutlineShoppingCart
        //                                         className=""
        //                                         size={26}
        //                                     />
        //                                     {/* <span className="hidden nav-item-name mt-[3rem]">
        //                                 Giỏ Hàng
        //                             </span>{" "} */}
        //                                 </Link>
        //                             </li>
        //                         </ul>
        //                     </button>
        //                     {dropdownOpen && userInfo && (
        //                         <ul
        //                             className={`absolute py-2 bg-white rounded-lg shadow w-44 sl:w-20 left-[-4rem] top-[3rem] text-sm text-gray-700 dark:text-gray-200 ${
        //                                 !userInfo.isAdmin
        //                                     ? "-bot-20"
        //                                     : "-bot-80"
        //                             }`}
        //                         >
        //                             {userInfo.isAdmin && (
        //                                 <>
        //                                     <li>
        //                                         <Link
        //                                             to="/admin/dashboard"
        //                                             className="block px-4 py-2 hover:bg-gray-100"
        //                                         >
        //                                             Bảng điều khiển
        //                                         </Link>
        //                                     </li>
        //                                     <li>
        //                                         <Link
        //                                             to="/admin/productlist"
        //                                             className="block px-4 py-2 hover:bg-gray-100"
        //                                         >
        //                                             Sản phẩm
        //                                         </Link>
        //                                     </li>
        //                                     <li>
        //                                         <Link
        //                                             to="/admin/categorylist"
        //                                             className="block px-4 py-2 hover:bg-gray-100"
        //                                         >
        //                                             Danh mục
        //                                         </Link>
        //                                     </li>
        //                                     <li>
        //                                         <Link
        //                                             to="/admin/orderlist"
        //                                             className="block px-4 py-2 hover:bg-gray-100"
        //                                         >
        //                                             Hóa đơn
        //                                         </Link>
        //                                     </li>
        //                                     <li>
        //                                         <Link
        //                                             to="/admin/userlist"
        //                                             className="block px-4 py-2 hover:bg-gray-100"
        //                                         >
        //                                             Người dùng
        //                                         </Link>
        //                                     </li>
        //                                 </>
        //                             )}

        //                             <li>
        //                                 <Link
        //                                     to="/profile"
        //                                     className="block px-4 py-2 hover:bg-gray-100"
        //                                 >
        //                                     Thông tin cá nhân
        //                                 </Link>
        //                             </li>
        //                             <div className="border-t border-gray-300 pt-1">
        //                                 <Link
        //                                     onClick={logoutHandler}
        //                                     className="block px-4 py-2 hover:bg-gray-100"
        //                                 >
        //                                     Đăng xuất
        //                                 </Link>
        //                             </div>
        //                         </ul>
        //                     )}

        //                     {!userInfo && (
        //                         <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#212425] dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        //                             <li>
        //                                 <Link to="/login" className="">
        //                                     <AiOutlineLogin
        //                                         className=""
        //                                         size={26}
        //                                     />
        //                                     {/* <span className="hidden nav-item-name mt-[3rem]">
        //                                     Đăng Nhập
        //                                 </span>{" "} */}
        //                                 </Link>
        //                                 {/* <Link to="/register" className="">
        //                                 <AiOutlineUserAdd
        //                                     className="mr-2 mt-[3rem]"
        //                                     size={26}
        //                                 />
        //                                 <span className="hidden nav-item-name mt-[3rem]">
        //                                     Đăng Ký
        //                                 </span>{" "}
        //                             </Link> */}
        //                             </li>
        //                             <li>
        //                                 <Link to="/register" className="">
        //                                     <AiOutlineUserAdd
        //                                         className=""
        //                                         size={26}
        //                                     />
        //                                 </Link>
        //                             </li>
        //                         </ul>
        //                     )}
        //                 </div>
        //             </div>
        //         </div>
        //     </nav>
        // </div>
    );
};

export default Navigation;
