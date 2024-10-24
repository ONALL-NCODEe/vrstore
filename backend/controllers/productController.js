import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand } =
            req.fields;

        // Xác thực
        switch (true) {
            case !name:
                return res.json({ error: "Tên là bắt buộc" });
            case !brand:
                return res.json({ error: "Thương hiệu là bắt buộc" });
            case !description:
                return res.json({ error: "Mô tả là bắt buộc" });
            case !price:
                return res.json({ error: "Giá là bắt buộc" });
            case !category:
                return res.json({ error: "Danh mục là bắt buộc" });
            case !quantity:
                return res.json({ error: "Số lượng là bắt buộc" });
        }

        const product = new Product({ ...req.fields });
        await product.save();
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
});

const updateProductDetails = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand } =
            req.fields;

        // Xác thực
        switch (true) {
            case !name:
                return res.json({ error: "Tên là bắt buộc" });
            case !brand:
                return res.json({ error: "Thương hiệu là bắt buộc" });
            case !description:
                return res.json({ error: "Mô tả là bắt buộc" });
            case !price:
                return res.json({ error: "Giá là bắt buộc" });
            case !category:
                return res.json({ error: "Danh mục là bắt buộc" });
            case !quantity:
                return res.json({ error: "Số lượng là bắt buộc" });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id, // Thêm _id nếu lỗi
            { ...req.fields },
            { new: true }
        );

        await product.save();

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
});

const removeProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi máy chủ" });
    }
});

const fetchProducts = asyncHandler(async (req, res) => {
    try {
        const pageSize = 6;
        const keyword = req.query.keyword
            ? { name: { $regex: req.query.keyword, $options: "i" } }
            : {};

        const count = await Product.countDocuments({ ...keyword });
        const products = await Product.find({ ...keyword }).limit(pageSize);

        res.json({
            products,
            page: 1,
            pages: Math.ceil(count / pageSize),
            hasMore: false,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi máy chủ" });
    }
});

const fetchProductById = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            return res.json(product);
        } else {
            res.status(404);
            throw new Error("Không tìm thấy sản phẩm");
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({})
            .populate("category")
            .limit(12)
            .sort({ createAt: -1 });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi máy chủ" });
    }
});

const addProductReview = asyncHandler(async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            );

            if (alreadyReviewed) {
                res.status(400);
                throw new Error("Bạn đã đánh giá sản phẩm này");
            }

            const review = {
                name: req.user.username,
                rating: Number(rating),
                comment,
                user: req.user._id,
            };

            product.reviews.push(review);
            product.numReviews = product.reviews.length;

            product.rating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                product.reviews.length;

            await product.save();
            res.status(201).json({ message: "Đã thêm đánh giá" });
        } else {
            res.status(404);
            throw new Error("Không tìm thấy sản phẩm");
        }
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).sort({ rating: -1 }).limit(4);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find().sort({ _id: -1 }).limit(5);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
});

export {
    addProduct,
    updateProductDetails,
    removeProduct,
    fetchProducts,
    fetchProductById,
    fetchAllProducts,
    addProductReview,
    fetchTopProducts,
    fetchNewProducts,
};
