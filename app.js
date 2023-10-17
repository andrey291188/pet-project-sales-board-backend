const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {authRouter, adsRouter, salesRouter} = require("./routes/api")

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"))

app.use("/api/sales", salesRouter)
app.use("/api/users", authRouter);
app.use("/api/ads", adsRouter);

app.use((rq, rs) => {
    rs.status(404).json({message: "Not found"});
});

app.use((err, rq, rs, next) => {
    const {status = 500, message = "Server error"} = err;
    rs.status(status).json({message: message})
})

module.exports = app