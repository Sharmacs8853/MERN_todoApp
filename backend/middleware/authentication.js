const jwt = require("jsonwebtoken");

const authentication = (req, res, next)=>{
    const token = req.headers.authorization;
    if(!token){
        req.res({"msg":"please login again"})
    }
    const decode = jwt.verify(token, "key");
    const user_id = decode.user_id;
    if(decode){
        req.body.user_id = user_id;
        next()
    }else{
        res.send({"msg":"please login"})
    }
}

module.exports = {authentication}