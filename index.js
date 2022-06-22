const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const adminRoute = require("./routes/admin");
const authRoute = require("./routes/auth");
const provinceRoute = require("./routes/province");
const cultureRoute = require("./routes/culture");

var cors = require("cors");
app.use(cors());

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection Successful"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/admins", adminRoute);
app.use("/api/provinces", provinceRoute);
app.use("/api/cultures", cultureRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
