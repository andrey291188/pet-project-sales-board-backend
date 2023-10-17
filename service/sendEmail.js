const nodemailer = require("nodemailer")
const nodemailerConfig = require("./nodemailerConfig")

const transport = nodemailer.createTransport(nodemailerConfig)

const sendEmail = async (data) => {

    const email = {...data, from: "andrey291188@meta.ua"};
    await transport.sendMail(email);
    return true

}

module.exports = sendEmail