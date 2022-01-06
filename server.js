//const path = require("path")
const express = require('express')
const app = express();
const morgan = require('morgan')
const dotenv = require('dotenv')
const bodyParser = require("body-parser")
const cors = require("cors")
var setHeader = require("./routes/user_routes")
const controller = require("./controller/user_controller")


const connectDB=require('./database/connection')

var corsOptions = {
  origin : "http://localhost:8001"
};

app.use(cors(corsOptions))


//parse request for content-type- application/js
app.use(express.json());

//add middlewares
//Parsing
app.use(bodyParser.urlencoded({
    extended: true
  }))


  app.get("/", (req,res)=>{
    res.json({
      message: "Welcome to server page"
    })
  })
  
  app.use(require("./routes/router"))
  //require("./routes/user_routes")(app);
  
 

 
/*app.use(express.static(path.join(__dirname, "..", "build")));

app.use((req, res, next)=>{
    res.sendFile(path.join(__dirname, "..", "build", "index.html"))
}) */


//dotenv
dotenv.config({path:'config.env'})

//mongodb connection
connectDB()
//log requests 
app.use(morgan("tiny"));


var server = app.listen(8000, console.log('Server started at 8000'))

server.keepAliveTimeout=0
server.headersTimeout=35*1000