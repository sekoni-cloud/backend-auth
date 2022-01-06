exports.allAccess = function(req,res){
    res.status(200);
    res.header("Access-Control-Allow-Header",
    "x-access-token, Origin, Content-Type, Accept")
    res.send("Public Content")
};

exports.userBoard = (req, res)=>{
    res.status(200)
    res.header("Access-Control-Allow-Header",
    "x-access-token, Origin, Content-Type, Accept")
    res.send("User Content")
};

exports.adminBoard = (req,res)=>{
    res.status(200)
    res.header("Access-Control-Allow-Header",
    "x-access-token, Origin, Content-Type, Accept")
    res.send("Admin Content")
};

exports.moderatorBoard = (req, res)=>{
    res.status(200)
    res.header("Access-Control-Allow-Header",
    "x-access-token, Origin, Content-Type, Accept")
    res.send("Moderator Content")
}