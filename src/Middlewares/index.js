const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const StudentUser = require("../models/user"); 
exports.verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        console.log(token);
        if (token) {
            const tokenParts = token.split(' '); // Split the token by space
            if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') { // Check if token is properly formatted
                const data = jwt.verify(tokenParts[1], "MYSECRETKEY@"); // Verify the token (tokenParts[1] contains the actual token)
                console.log(data);
                const { id } = data; // Destructure and extract id from data
                req.id = id;
                return next();
            } else {
                return res.status(401).json({ message: "Invalid token format" });
            }
        } else {
            return res.status(401).json({ message: "Token is missing" });
        }
    } catch (err) {
        return res.status(401).json({ err });
    }
};



exports.isAdmin = async (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: "Token is missing" });
    }

    try {
       
        const tokenParts = token.split(' '); // Split the token by space
        if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') { // Check if token is properly formatted
            const data = jwt.verify(tokenParts[1], "MYSECRETKEY@"); // Verify the token (tokenParts[1] contains the actual token)
            console.log(data.role);
            const checkRole = await StudentUser.findById(data.id);
            if(checkRole.role !== 'admin'){
                return res.status(403).json({ message: "Unauthorized: Only admin can perform this action" });
            }
            
        } else {
            return res.status(401).json({ message: "Invalid token format" });
        }
        // If user is admin, proceed to the next middleware
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

exports.validatedform = [
    check("name").notEmpty().withMessage("please enter your name"),
    check("email").isEmail().withMessage("enter valid email"),
    check("password").isStrongPassword().withMessage("enter 8 digit password"),
    check("PhoneNo").isMobilePhone().withMessage("number up to 10 digits"),
    check("message").notEmpty().withMessage("enter a message")
];

exports.isvalidated = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    } else {
        return res.status(400).json({ message: errors.array()[0] });
    }
};
