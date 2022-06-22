const router = require("express").Router();
const Admin = require("../models/Admin");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


// register
router.post("/register", async (req, res) => {
    const newAdmin = new Admin({
        username: req.body.username,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
    });

    try {
        const savedAdmin = await newAdmin.save();
        res.status(201).json(savedAdmin);
    } catch (err) {
        res.status(500).json(err);
    }
});

//login
router.post("/login", async (req, res) => {
    try {
        const admin = await Admin.findOne({ username: req.body.username });
        !admin && res.status(401).json("Wrong Credentials!");

        const hashedPassword = CryptoJS.AES.decrypt(
            admin.password,
            process.env.PASS_SEC
        );

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password &&
            res.status(401).json("Wrong Credentials!");

        const accessToken = jwt.sign(
            {
                id: admin._id,
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );
        const { password, ...others } = admin._doc;

        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;