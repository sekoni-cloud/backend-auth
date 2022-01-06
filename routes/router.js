const express = require('express')
const route = express.Router()
const verifySignUp = require("../middlewares/verifySignUp")
const controller = require("../controller/controller")
const user_controller = require("../controller/user_controller")
const authJwt = require("../middlewares/authJwt")



route.get('/', (req,res)=>{
    res.render('server')
})



route.get('/LoginPage',(req,res)=>{
    res.render('LoginPage')
})
//API
//route.post('/api/users', controller.create)
route.post('/api/users', verifySignUp.checkDuplicateUsernameorEmail,
    verifySignUp.checkRolesExisted,
    controller.signup)
//route.get('/api/users', controller.find)
route.get('/api/users', controller.signin)
route.get('/api/all', user_controller.allAccess)
route.get('/api/test/user', authJwt.verifyToken,user_controller.userBoard);
route.get("api/test/mod", 
    authJwt.verifyToken, 
    authJwt.isModerator,
    user_controller.moderatorBoard
);
route.get("api/test/admin", 
authJwt.verifyToken, 
authJwt.isAdmin,
user_controller.adminBoard
);
route.put('/api/users/:id', controller.update)
route.delete('/api/users/:id', controller.delete)

module.exports = route;
