const express = require("express")
const app = express();
const cors = require('cors');
const port = process.env.PORT || 1000
require("dotenv").config();

app.use(cors({origin: "*"}));

app.use(express.json());

app.use("/", require("./endpoints/endpoint"))


const start = async()=>{
   try {
      
      app.listen(port,()=>{
         console.log("hello express")
      })

   } catch (error) {
      console.log(error);
   }
}

start();