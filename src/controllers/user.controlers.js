const userM = require("../models/user.models");
const bcrypt = require("bcrypt");
const {createToken} = require("../utils/jwt");



const registerUser = async (req, res) => {
  let { name, email, password } = req.body;
  
  try {
    const emailchecked = await userM.checkEmail(email);
    if (emailchecked) {
      return res.status(400).json({
        msg: " el usuario ya existe",
      });
    }
    password = bcrypt.hashSync(password, 10);
    const createUser = await userM.addUser(name, email, password);
    console.log(createUser);

    return res.status(200).json({
      msg: "usuario creado",
      result: createUser.insertId,
    });



  } catch (error) {
    res.status(500).json({
      error,
      msg:" aqui esta el problema"
    });
  }
};







const login = async (req, res) => {
  try {

    const { email, password } = req.body;
    const selectedUser = await userM.checkEmail(email);
    console.log(selectedUser);
    if (!selectedUser) {
      return res.status(400).json({
        msg: "el usuario no existe",
      });
    }
    const isSame = await bcrypt.compareSync(password, selectedUser[0].password);
    console.log(isSame);
    if (!isSame) {
      return res.status(400).json({
        msg: "la contraseña es incorrecta",
      });
    }else{

      const infoToken = {
      id:selectedUser[0].id,
      email:selectedUser[0].email,
    } 

    console.log("Clave secreta:", process.env.JWT_SECRET_KEY);
    console.log("Payload:", infoToken);


    const token = createToken(infoToken);
    console.log(token);
    res.status(200).json(token);}

    



  } catch (error) {
    res.status(500).json(error);
  }
};





const getProfile = async (req, res) => {

  const {id} = req.userLogin;
  const selectedUser = await userM.findById(id);

  if(!selectedUser){
   return res.status(404).json({
      msg:"no se encuantra el usuario"
    });
  }

  res.status(200).json({selectedUser});


}




const deleteUser = async(req,res)=>{
    const {id} = req.params;

    if(Number(id) !== req.userLogin.id){
      return res.status(400).json({
        msg:"No puedes borrar a otros usuarios"
      })
    }
    const deletedUser = await userM.findByIdAndDelete(id);
    if(!deletedUser){
      return res.status(404).json({
        msg:"no se encuentra el usuario"
      });
    }

    res.status(200).json({
      msg :" el usuario se ha eliminado",
    });

}


const updateUser = async(req,res) => {
 
  try {
    
  const {id} = req.params;
  const {name, email, password} = req.body;
  if(Number(id) !== req.userLogin.id){
    console.log(req.userLogin)
    return res.status(400).json({
      msg: "No puedes modificar otros usuarios"
    });
  }

  const updatedUser = await userM.findByIdAndUpdate(id,name, email, password);
  if(!updatedUser){
    return res.status(400).json({
      msg: "no se ha podido actualizar"
    });
  }

  return res.status(200).json({
    msg: " el usuario se ha actualizado",
    result: updatedUser.affectedRows

  });



  } catch (error) {

    res.status(500).json({error});

  }

}





module.exports = { registerUser, login, getProfile, updateUser, deleteUser };
