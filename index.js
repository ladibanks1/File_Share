import "dotenv/config.js";
import express from "express";
import connectToDatabase from "./config/db.config.js";
import upload from "./middleware/multer.middleware.js";
import authRoute from "./routes/auth.routes.js";
import errorHandler from "./middleware/errorHandler.middleware.js";
import isAuth from "./middleware/isAuth.middleware.js";
import fileRoute from "./routes/file.routes.js";
import fileDownload from "./routes/fileDownload.routes.js";
import cors from "cors"

const app = express();

app.use(express.json());

app.use(cors())
// Handle  File Upload
app.use(upload);

app.use("/auth", authRoute);

app.use("/download" , fileDownload)

app.use(isAuth);

app.use("/file", fileRoute);


app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Handle Errors
app.use(errorHandler);

app.listen(3900, async () => {
  console.log("Server is running on port 3000");
  await connectToDatabase();
});
