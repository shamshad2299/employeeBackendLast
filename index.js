import express from "express";
import dotenv from "dotenv";
import DataBaseConntect from "./DataBaseToConnect/DbConnect.js";
import router from "./Router/allRouter.js";
import cors from "cors";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from "multer";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
     origin: "https://employee-front-end-gold.vercel.app",
    // origin : "http://localhost:5173",
    credentials: true,
  })
);


// 🔹 Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 🔹 Setup Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => 'png', // Set default format (you can change this)
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'File upload failed' });
  }
  res.json({ imageUrl: req.file.path });
});


const port = process.env.PORT || 5000;
// const url = process.env.URL || "https://employee-backend-last.vercel.app";
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



