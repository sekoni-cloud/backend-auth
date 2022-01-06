/*const express = require('express')
const route = express.Router()
//const app = express();
const authJwt = require("../middlewares/authJwt")
const controller = require("../controller/user_controller")
*/
/*module.exports = (app)=>{
    app.use((req,res,next)=>{
        res.header(
            "Access-Control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("api/test/all", controller.allAccess);
    app.get("api/test/user", authJwt.verifyToken, controller.userBoard);
    app.get("api/test/mod", 
    authJwt.verifyToken, 
    authJwt.isModerator,
    controller.moderatorBoard
    );
    app.get("api/test/admin", 
    authJwt.verifyToken, 
    authJwt.isAdmin,
    controller.adminBoard
    );
} */

