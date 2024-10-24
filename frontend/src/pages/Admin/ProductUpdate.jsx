import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast, useToast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductUpdate = () => {
    const params = useParams();

    const { data: productData } = useGetProductByIdQuery(params._id);

    const [image, setImage] = useState(productData?.image || "");
    const [name, setName] = useState(productData?.name || "");
    const [description, setDescription] = useState(
        productData?.description || ""
    );
    const [price, setPrice] = useState(productData?.price || "");
    const [category, setCategory] = useState(productData?.category || "");
    const [quantity, setQuantity] = useState(productData?.quantity || "");
    const [brand, setBrand] = useState(productData?.brand || "");
    const [stock, setStock] = useState(productData?.countInStock);

    const navigate = useNavigate();

    const { data: categories = [] } = useFetchCategoriesQuery();
    const [uploadProductImage] = useUploadProductImageMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    useEffect(() => {
        if (productData && productData._id) {
            setName(productData.name);
            setDescription(productData.description);
            setPrice(productData.price);
            setCategory(productData.category?._id);
            setQuantity(productData.quantity);
            setBrand(productData.brand);
            setImage(productData.image);
            setStock(productData.countInStock); // Cập nhật stock
        }
    }, [productData]);

    // const handleChange = (e) => {
    //     const newValue = Number(e.target.value);
    //     console.log("New stock value:", newValue); // Ghi giá trị mới vào console
    //     setStock(newValue);
    // };

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success("Đã thêm mục thành công");
            setImage(res.image);
        } catch (error) {
            toast.error("Đã thêm mục thành công");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!category) {
            return toast.error("Vui lòng chọn một danh mục.");
        }

        try {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("quantity", quantity);
            formData.append("brand", brand);
            formData.append("countInStock", stock);

            const { data } = await updateProduct({
                productId: params._id,
                formData,
            });

            if (data?.error) {
                toast.error(data.error);
            } else {
                toast.success(`Sản phẩm đã được cập nhật thành công.`);
                navigate("/admin/allproductslist");
            }
        } catch (error) {
            console.error(error);
            toast.error("Cập nhật sản phẩm không thành công. Hãy thử lại.");
        }
    };

    const handleDelete = async () => {
        try {
            let answer = window.confirm("Xác nhận xóa sản phẩm?");

            if (!answer) return;

            const { data } = await deleteProduct(params._id);
            toast.success(`${data.name} đã được xóa`);
            navigate("/admin/allproductslist");
        } catch (error) {
            console.error(error);
            toast.error("Xóa sản phẩm thất bại. Hãy thử lại");
        }
    };

    return (
        <div className="container  xl:mx-[9rem] sm:mx-[0]">
            <div className="flex flex-col md:flex-row">
                <AdminMenu />
                <div className="md:w-3/4 p-3">
                    <div className="h-12">Update / Delete Product</div>

                    {image && (
                        <div className="text-center">
                            <img
                                src={image}
                                alt="product"
                                className="block mx-auto w-full h-[40%]"
                            />
                        </div>
                    )}

                    <div className="mb-3">
                        <label className="text-white  py-2 px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                            {image ? image.name : "Upload image"}
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={uploadFileHandler}
                                className="text-white"
                            />
                        </label>
                    </div>

                    <div className="p-3">
                        <div className="flex flex-wrap">
                            <div className="one">
                                <label htmlFor="name">Name</label> <br />
                                <input
                                    type="text"
                                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="two">
                                <label htmlFor="name block">Price</label> <br />
                                <input
                                    type="number"
                                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap">
                            <div>
                                <label htmlFor="name block">Quantity</label>{" "}
                                <br />
                                <input
                                    type="number"
                                    min="1"
                                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="name block">Brand</label> <br />
                                <input
                                    type="text"
                                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </div>
                        </div>

                        <label htmlFor="" className="my-5">
                            Description
                        </label>
                        <textarea
                            type="text"
                            className="p-2 mb-3 bg-[#101011]  border rounded-lg w-[95%] text-white"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <div className="flex justify-between">
                            <div>
                                <label htmlFor="name block">
                                    Count In Stock
                                </label>{" "}
                                <br />
                                <input
                                    type="number"
                                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="">Category</label> <br />
                                <select
                                    placeholder="Choose Category"
                                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                >
                                    <option disabled selected>
                                        Chọn danh mục
                                    </option>

                                    {categories?.map((c) => (
                                        <option key={c._id} value={c._id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="">
                            <button
                                onClick={handleSubmit}
                                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-green-600 mr-6"
                            >
                                Update
                            </button>
                            <button
                                onClick={handleDelete}
                                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-pink-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;
