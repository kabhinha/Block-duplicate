const express = require("express");
const app = express();
const database = require("./config/database");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');

require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

cloudinaryConnect();
database.connect();

const cartroutes = require("./routes/cart");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const itemRoutes = require("./routes/item");

app.use("", cartroutes);
app.use("", authRoutes);
app.use("", userRoutes);
app.use("", itemRoutes);



app.listen(process.env.PORT, () => {
  console.log(`App is listening on Port ${process.env.PORT}`);
});
