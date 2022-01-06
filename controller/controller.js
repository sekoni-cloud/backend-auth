const Userdb = require('../model/user_model')

const config = require("../config/auth_config")
const Role = require("../model/roles_model")
var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs")

const saltRounds = 10;

exports.signup = (req,res)=>{
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, saltRounds)
    });

    user.save((err, user)=>{
        if(err){
            res.status(500).send({
                message:err
            })
            return;
        }
        if(req.body.roles){
            Role.find({
                name:{ $in : req.body.roles},
            },
            (err,roles)=>{
                if(err){
                    res.status(500).send({
                        message: err
                    })
                    return
                }
                user.roles= roles.map(role=>role._id);
                user.save(err=>{
                    if(err){
                        res.status(500).send({
                            message: err
                        });
                        return;
                    }
                    res.send({message:"User was registered successfully"});
                });
            })
        }else{
            Role.findOne({name:"user"}, (err,role)=>{
                if(err){
                    res.status(500).send({message:err});
                }
                user.roles = [role._id];
                user.save(err=>{
                    if(err){
                        res.status(500).send({messsage:err})
                        return;
                    }
                    res.header("Access-Control-Allow-Header",
                    "x-access-token, Origin, Content-Type, Accept")
                    res.send({message:"User was registered successfully"})
                })
            })
        }
    })
};

exports.signin = (req,res)=>{
    Userdb.findOne({
        name : req.body.name
    })
    .populate("roles", "-_v")
    .exec((err,user)=>{
        if(err){
            res.status(500).send({message:err})
            return
        }
        if(!user){
            return res.status(404).send({message:"User Not found"})
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password"
            });
        }
        var token = jwt.sign({id:user.id}, config.secret ,{
            expiresIn: 86400 //24hours
        });
        var authorities = [];
        for(let i = 0; i < user.roles.length; i++){
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.header("Access-Control-Allow-Header",
        "x-access-token, Origin, Content-Type, Accept")
        res.status(200).send({
            id:user._id,
            username: user.name,
            email:user.email,
            roles: authorities,
            accessToken: token
        })
        
    })
}
//create and save new user
exports.create = (req,res)=>{
    if(!req.body){
        res.status(404).send({message:'Content cannot be empty'})
        return;
    }
    //new user
    const user = new Userdb({
        name: req.body.name,
        email:req.body.email,
        password : bcrypt.hashSync(req.body.password, 8)
    })

    //save user in database
    user
    .save(user)
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "Some errors occured while creating a create operation"
        })
    })
}

//retrieve and return all users(or single)
exports.find = (req,res)=>{
    Userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "Error occured while retrieving user information"
        })
    })
} 

//update user by id
exports.update = (req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({
            message: err.message || "Data unable to update"  
        })
    }

    const id = req.params.id
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message: `Cannot update user with ${id}, Maybe user not found`})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"Error Update"
        })
    })
}

//delete user by id
exports.delete = (req,res)=>{
    const id = req.params.id
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({
                message: `Cannot update user with ${id}`
            })
        }else{
            res.send("User deleted successfully")
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"Could not delete user"
        })
    })
}