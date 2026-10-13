import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
import dotenv, { configDotenv } from "dotenv"
dotenv.config();
import connectDB from "./src/db/db.connect.js"
import app from "./src/app.js"



connectDB()
  .then(()=>{app.listen(process.env.PORT || 8000, () => {
    console.log("The data base connection successfully on PORt", 8000);
  })})
  .catch(()=>{
    console.error(erros);
  })

