import users from "./routes/users";
import mongoose from "mongoose";
import express from "express";
const app = express();

app.use(express.json());
app.use("/api/users", users);

mongoose
  .connect("mongodb://localhost/renoveta-backend")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

app.listen(8000, () => console.log("Listening on port 8000..."));
