import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import { dbConnect } from "./config/dbConnect.js";
import { ErrorMiddleware } from "./middlewares/error.js";
import userRouter from './routes/userRoutes.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/v1",userRouter)
  app.use(ErrorMiddleware)

 
dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🔥`);
    });
  })
  .catch((err) => console.log(err.message));
