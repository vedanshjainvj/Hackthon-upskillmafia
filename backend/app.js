require('dotenv').config();
const express  = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const port = process.env.PORT|| 5000;
const cors = require('cors');
const auth  = require("./src/routes/auth");
const skill  = require("./src/routes/skill");

app.use(cors(
    {
      origin:"http://localhost:5173",
       methods: ["POST", "GET","OPTIONS", "PATCH", "PUT", "DELETE"],
      credentials: true,
    }
  ));


  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:5173",);
    res.header('Access-Control-Allow-Credentials', "true");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  //Set Use State
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(auth);
  app.use(skill);
  
app.get("/",(req,res)=>{
    res.send("Hello how are you")
})


//Connect Data Base
try { 
    mongoose.connect(process.env.DatabaseConnect)
    console.log("Data bas connect successfully...")
} catch (error) {
    console.log(error);
}

app.listen(port,()=>{
    console.log("Connection successfully... ")
})