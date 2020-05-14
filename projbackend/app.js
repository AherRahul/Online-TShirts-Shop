require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// My Routes
const authRoutes = require("./routes/auth");
const userRoutes = require('./routes/user');
const categoriesRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

const app = express();

// DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED..!!");
}).catch(() => {
    console.log("DB NOT CONNCETED..!!");
})

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


// Initalizing Port
const port = process.env.PORT || 3000;

// Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoriesRoutes);
app.use('/api', productRoutes);

// Creating the server
app.listen(port, () => console.log(`T-Shit Store app listening at http://localhost:${port}`));