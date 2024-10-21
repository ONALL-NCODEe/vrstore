import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        try {
            const res = await login({ email, password }).unwrap();
            console.log(res);
            dispatch(setCredentials({ ...res }));
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }
    };

    return (
        <div>
            <section className="pl-[10rem] flex flex-wrap">
                <div className="mr-[4rem] mt-[5rem]">
                    <h1 className="text-2xl font-semibold mb-4">Đăng Nhập</h1>

                    <form
                        onSubmit={submitHandler}
                        className="container w-[40rem]"
                    >
                        <div className="my-[2rem]">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray"
                            >
                                Địa chỉ Email *
                            </label>

                            <input
                                type="email"
                                id="email"
                                className="mt-1 p-2 border rounded w-full"
                                placeholder="Nhập email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray"
                            >
                                Mật khẩu *
                            </label>

                            <input
                                type="password"
                                id="password"
                                className="mt-1 p-2 border rounded w-full"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            disabled={isLoading}
                            type="submit"
                            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
                        >
                            {isLoading ? "Đang Đăng Nhập..." : "Đăng Nhập"}
                        </button>

                        {isLoading && <Loader />}
                    </form>

                    <div className="mt-4">
                        <p className="text-gray">
                            Khách hàng mới ? {""}
                            <Link
                                to={
                                    redirect
                                        ? `/register?redirect=${redirect}`
                                        : "/register"
                                }
                                className="text-pink-500 hover:underline"
                            >
                                Đăng ký
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
