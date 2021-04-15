const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();


const app = express();

const pdfRoutes = require("./routes/pdfnode");

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("DB CONNECTED");
    });

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", pdfRoutes);


const port = process.env.PORT || 5000;
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World");
});


app.listen(port, () => {
    console.log(`App is listining at ${port}`);
});