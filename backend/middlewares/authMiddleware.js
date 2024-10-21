import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
    let token;

    // Read JWT from the 'jwt' cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Không được ủy quyền, token đã thất bại!");
        }
    } else {
        res.status(401);
        throw new Error("Không được ủy quyền, không có token!");
    }
});

const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send(
            "Không được ủy quyền với tư cách là quản trị viên"
        );
    }
};

export { authenticate, authorizeAdmin };
