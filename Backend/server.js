import express from "express"
import dotenv, { configDotenv } from "dotenv"
import connectDB from "./src/db/db.connect.js"
import app from "./src/app.js"

dotenv.config();

connectDB()
  .then(()=>{app.listen(process.env.PORT || 8000, () => {
    console.log("The data base connection successfully on PORt", 8000);
  })})
  .catch(()=>{
    console.error(erros);
  })

