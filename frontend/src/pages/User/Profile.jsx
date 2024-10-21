import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";

const Profile = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading: loadingUpdateProfile }] =
        useProfileMutation();

    useEffect(() => {
        setUserName(userInfo.username);
        setEmail(userInfo.email);
    }, [userInfo.username, userInfo.email]);

    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Mật khẩu không khớp");
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    username,
                    email,
                    password,
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success("Cập nhật thông tin thành công");
            } catch (error) {
                toast.error(error?.data?.message || error.message);
            }
        }
    };

    return (
        <div className="container mx-auto p-4 mt-[10rem] bg-gray-100">
            <div className="flex justify-center align-center md:flex md:space-x-4">
                <div className="md:w-1/3">
                    <h2 className="text-2xl font-semibold mb-4 text-gray">
                        Cập nhật thông tin cá nhân
                    </h2>

                    <form onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label className="block text-gray mb-2">
                                Tên người dùng
                            </label>
                            <input
                                type="text"
                                placeholder="Nhập tên người dùng"
                                className="form-input p-4 rounded-sm w-full"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray mb-2">
                                Địa chỉ Email
                            </label>
                            <input
                                type="email"
                                placeholder="Nhập địa chỉ email"
                                className="form-input p-4 rounded-sm w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray mb-2">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                placeholder="Nhập mật khẩu"
                                className="form-input p-4 rounded-sm w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray mb-2">
                                Xác nhận mật khẩu
                            </label>
                            <input
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                className="form-input p-4 rounded-sm w-full"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
                            >
                                Cập Nhật
                            </button>

                            <Link
                                to="/user-orders"
                                className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 
                                focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg 
                                text-sm px-5 py-2.5 text-center inline-flex items-center 
                                dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/80 me-2 mb-2"
                            >
                                Đơn hàng của tôi
                            </Link>
                        </div>
                    </form>
                </div>

                {loadingUpdateProfile && <Loader />}
            </div>
        </div>
    );
};

export default Profile;
