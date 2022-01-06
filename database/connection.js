const mongoose = require('mongoose')
const Userdb = require("../model/user_model")
const db = require("../model/index")
const Role = require("../model/roles_model")
const connectDB = async()=>{
    try{
        //mongodb connection
        const con = await db.mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser : true,
            useUnifiedTopology : true,
            //useFindAndModify : false,
           // useCreateIndex: true
        })
        console.log(`MONGODB Connected : ${con.connection.host}`);
        initial();
       // initialUserdb();
    }catch(err){
        console.log(err);
        process.exit(1)
    }
}

function initial(){
    Role.estimatedDocumentCount((err,count)=>{
      if(!err && count ===0){
        new Role({
          name: "user"
        }).save(err=>{
          if(err){
            console.log("error",err);
          }
          console.log("add 'user' to roles collection");
        });
        new Role({
          name: "moderator"
        }).save(err=>{
          if(err){
            console.log("error",err);
          }
          console.log("add 'moderator' to roles collection");
        });
        new Role({
          name: "admin"
        }).save(err=>{
          if(err){
            console.log("error",err);
          }
          console.log("add 'admin' to roles collection");
        });
      }
    });
  }
  
  function initialUserdb(){
    Userdb.estimatedDocumentCount((err,count)=>{
      if(!err && count===0){
        new Userdb({
        name:'Sekoni Wasiu',
        email:'adebowale@gmail.com'
        ,
        password :'234567',
        }).save(err=>{
          if(err){
            console.log("error",err);
          }
          console.log("Userdb document created finally");
        });
      }
    })
  }
module.exports= connectDB;