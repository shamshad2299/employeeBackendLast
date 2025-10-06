import express from "express";
import dotenv from "dotenv";
import DataBaseConntect from "./DataBaseToConnect/DbConnect.js";
import router from "./Router/allRouter.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';


dotenv.config();

const app = express();
app.use(express.json());
// __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Now this works
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
  cors({
     //origin: "https://employee-front-end-gold.vercel.app",
     origin : "http://localhost:5173",
    credentials: true,
  })
);

const port = process.env.PORT || 5000;
 //const url = process.env.URL || "https://employee-backend-last.vercel.app";
const url = process.env.URL || "http://localhost:5173";
app.use(express.urlencoded({ extended: true }));



// app.use(express.static("public/uploads"));
// app.use(express.static('public'));


app.get("/", (req, res) => {
  res.json({
    success: true,
    data: [{ name: "shamshad Ahamad", education: "higher", dob: "20/04/2002" }],
    error: false,
    message: "server is running smoothly on the web",
  });
});

//Basic routing
app.use("/api", router);

DataBaseConntect().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on ${url}:${port}`);
  });
});



