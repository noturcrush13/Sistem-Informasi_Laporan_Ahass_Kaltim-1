const express = require("express")
const dotenv = require("dotenv");
dotenv.config();

const routes = require("./routes");
const openDBConnection = require("./helpers/db");
const res = require("express/lib/response");

const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI

async function main(){
    try {
        // memastikan koneksi database
        await openDBConnection(uri);

        const app = express();
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

        app.listen(port, ()=>{
            console.log("server is listening on port", port);
        });
    } catch (error){
        console.log("main", error);
    }
}

main();