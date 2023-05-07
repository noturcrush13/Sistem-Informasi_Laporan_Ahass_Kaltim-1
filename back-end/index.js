const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./routes");
const openDBConnection = require("./helpers/db");

dotenv.config();

const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

// memastikan koneksi database
openDBConnection(uri);

const app = express();

// add cors configuration
app.use(cors({
    origin: "*",
    methods: "*",
    headers: "*",
}));

app.use(express.json());
app.use(routes);

app.use((req, res, next) => {
    const err = new Error("not found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({error: {message: err.message}});
});

app.listen(port, () => {
    console.log("server is listening on port", port);
});
