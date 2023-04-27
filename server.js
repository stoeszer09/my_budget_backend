require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// MIDDLEWARE
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

// ROUTES


app.get("/", (req, res) => {
    console.log("root url");
    res.send("Hello Word!");
});

// LISTEN
const port = process.env.PORT ?? 5000;
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});