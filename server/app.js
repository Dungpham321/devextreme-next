require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectDB = require('./db/Connect');
const PORT = process.env.PORT || 5001;
const User_router = require("./routes/user");
const DangNhap_router = require("./routes/DangNhap");
const verifyJWT = require('./Middleware/verifyJWT');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Cho phép tất cả domain
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use("/api/user",User_router);
app.use("/api",DangNhap_router);
app.use(verifyJWT);


const start = async () => {
    try {
        await connectDB(process.env.MONGGODB_URL);
        app.listen(PORT);
    } catch (error) {
        console.log(error);
    }
}
start();
    
