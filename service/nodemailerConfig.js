require("dotenv").config();

const {META_PASSWORD} = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: "andrey291188@meta.ua",
        pass: META_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
};

module.exports = nodemailerConfig