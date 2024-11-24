import { createTransport } from "nodemailer";

const transport = createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASS
    }
});

export  default transport