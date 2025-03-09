import express from 'express';
import dotenv from 'dotenv';
import DataBaseConntect from './DataBaseToConnect/DbConnect.js';
import router from './Router/allRouter.js';
import cors from "cors"
dotenv.config();


const app = express();
app.use(express.json());

app.use(cors({
  origin : "https://employee-front-end-gold.vercel.app",
  credentials : true,
}));


const port = process.env.PORT || 5000;
const url = process.env.URL || "http://localhost";
app.use(express.urlencoded({ extended: true }));

//for using images at frontEnd 
app.use(express.static("public/uploads"))

app.get('/', (req, res) => {
  res.send('Hello from the server');
}
);

app.use("/api" , router)

DataBaseConntect().then(()=>{
  app.listen(port, () => {
    console.log(`Server is running on ${url}:${port}`);
  });
})