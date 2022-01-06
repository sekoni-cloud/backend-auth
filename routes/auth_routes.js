//const express = require('express')
//const route = express.Router()
//const app = express();
/*const verifySignUp = require("../middlewares/verifySignUp")
const controller = require("../controller/controller")

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        ),
        next();
    });
    app.post(
        "/api/auth/signup",
        verifySignUp.checkDuplicateUsernameorEmail,
        verifySignUp.checkRolesExisted,
        controller.signup
    );
    app.post("/api/auth/signin", controller.signin)
}*/