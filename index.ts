import auth from "./routes/auth";
import users from "./routes/users";
import forms from "./routes/form";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/forms", forms);

mongoose
  .connect(
    "mongodb+srv://Renoveta:gUhTpOSkjaPMpeEe@renoveta.kc4boz1.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

app.listen(5000, () => console.log("Listening on port 5000..."));
