require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED..!!");
}).catch(() => {
    console.log("DB NOT CONNCETED..!!");
})

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("T-shirt shop");
});

app.listen(port, () => console.log(`T-Shit Store app listening at http://localhost:${port}`));