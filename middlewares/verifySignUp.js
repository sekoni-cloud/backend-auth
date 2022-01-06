const db = require('../model/index')
const User = require('../model/user_model')
const ROLES  = db.ROLES; 

checkDuplicateUsernameorEmail = (req,res,next) =>{
    //IUsername
    User.findOne({
        name:req.body.name
    }).exec((err,user)=>{
        if(err){
            res.status(500).send({
                message:err
            })
            return;
        }
        if(user){
            res.status(400).send({
                message: "Failed! Username is already in use"
            })
            return
        }
        //Email
        User.findOne({
            email:req.body.email
        }).exec((err, user)=>{
            if(err){
                res.status(500).send({
                    message: err
                })
            }
            if(user){
                res.status(400).send({
                    message: "Failed! Email is already in use"
                })
            }
            next();
        });
    });
};

checkRolesExisted = (req, res, next)=>{
    if(req.body.roles){
        for(let i =0; i < req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist!`
                });
                return;
            }
        }
    }
    next();
};

const verifySignUp={
    checkDuplicateUsernameorEmail,
    checkRolesExisted
}
module.exports = verifySignUp;