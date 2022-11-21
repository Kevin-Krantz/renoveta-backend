import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

interface IMessage {
  email: string;
  subject: string;
  adminResponse: string;
}

const sendEmail = async ({ email, subject, adminResponse }: IMessage) => {
  const transporter = nodemailer.createTransport({
    host: "gmail",
    port: 456,
    secure: true,
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_SECURE_PASSWORD,
    },
  });

  transporter.verify(function (error, sucess) {
    if (error) {
      console.log(error.message);
    } else {
      console.log("Success");
    }
  });

  const options = {
    from: process.env.GMAIL_USERNAME,
    to: email,
    subject: subject,
    text: `<p> ${adminResponse} <p>`,
  };

  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log(error.message);
    } else {
      console.log(info.response || info.rejected);
      transporter.close();
    }
  });
};

// router.get("/", (req, res) => {
//   res.sendFile((__dirname = "/api/forms/form")); ///where is the response textbox filepath?
// });

router.post("/", async (req, res) => {
  try {
    const { email, adminResponse, subject } = req.body;
    await sendEmail({ email, adminResponse, subject });
    res.status(200).send(res.statusMessage);
  } catch (error) {
    res.status(500).send("server error!");
  }
});

export default router;
