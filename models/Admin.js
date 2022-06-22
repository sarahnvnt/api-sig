const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
    {
        username: { type: String , required: true, unique: true, min: 3, max: 20 },
        password: { type: String, required: true, min: 6},
        },

    { timestamps: true }
);

module.exports = mongoose.model("Admin", AdminSchema);