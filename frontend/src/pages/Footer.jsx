const Footer = () => {
    return (
        <>
            <div className="bg-[#050708]/100 dark:bg-gray-800 ">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-200 sm:text-center dark:text-gray-400">
                        © {new Date().getFullYear()}™. Bản quyền thuộc về{" "}
                        <a href="/" className="hover:underline">
                            VRstore
                        </a>
                    </span>
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-200 dark:text-gray-400 sm:mt-0">
                        <li>
                            <a
                                href="/"
                                className="hover:underline me-4 md:me-6"
                            >
                                Trang Chủ
                            </a>
                        </li>
                        <li>
                            <a
                                href="/shop"
                                className="hover:underline me-4 md:me-6"
                            >
                                Cửa Hàng
                            </a>
                        </li>
                        <li>
                            <a
                                href="/cart"
                                className="hover:underline me-4 md:me-6"
                            >
                                Giỏ Hàng
                            </a>
                        </li>
                        <li>
                            <a href="/favorite" className="hover:underline">
                                Yêu Thích
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Footer;
