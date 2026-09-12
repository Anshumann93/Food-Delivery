import express from "express"
import dotenv, { configDotenv } from "dotenv"
import connectDB from "./src/db/db.connect.js"

dotenv.config();

const app = express()

app.listen(process.env.PORT || 8000,()=>{
  console.log("The data base connection successfully on PORt",8000);
})