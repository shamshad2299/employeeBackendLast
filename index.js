import express from "express";
import dotenv from "dotenv";
import DataBaseConntect from "./DataBaseToConnect/DbConnect.js";
import router from "./Router/allRouter.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "https://employee-front-end-gold.vercel.app",
    credentials: true,
  })
);

const port = process.env.PORT || 5000;
const url = process.env.URL || "https://employee-backend-last.vercel.app";
app.use(express.urlencoded({ extended: true }));



app.use(express.static("public/uploads"));
app.use(express.static('public'));


app.get("/", (req, res) => {
  res.json({
    success: true,
    data: [{ name: "shamshad Ahamad", education: "higher", dob: "20/04/2002" }],
    error: false,
    message: "server is running smoothly on the web",
  });
});

app.use("/api", router);

DataBaseConntect().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on ${url}:${port}`);
  });
});
