const jwt =  require("jsonwebtoken");


const createToken = (data)=> {
  try {
    return jwt.sign(data, process.env.PASS_KEY, {expiresIn :"1h"})
    
  } catch (error) {
    console.log(error)
  }
}



const verifyToken =(token)=>{
     try {
     return data = jwt.verify(token, process.env.PASS_KEY);
    } catch (error) {
      res.json({ message: 'Token incorrecto' });
      console.log(error);
    }
}



module.exports = { createToken, verifyToken };