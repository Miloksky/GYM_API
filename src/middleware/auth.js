const {verifyToken} = require("../utils/jwt");


const checkToken = (req, res, next) => {

  try {
    if (!req.headers.authorization) {
      res.json({ success: false, message: 'El token es obligatorio' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const resulToken = verifyToken(token);
    if (!resulToken){
      return res.status(400).json({ mgs: "el token es incorrecto" });
    }
    
    
    req.userLogin = resulToken;

    next();


  } catch (error) {}
  
};
module.exports = checkToken;
