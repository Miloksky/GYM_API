const pool = require("../config/conexion");

const checkEmail = async (email) => {
  const select = "SELECT * FROM users WHERE email = ?";
  const [result] = await pool.query(select, [email]);
  if (result.length === 0) {
    return false;
  }
  return result;
};



const addUser = async (name, email, password) => {
  const insert = "INSERT INTO users (name,email,password) VALUES (?,?,?)";
  const [result] = await pool.query(insert, [name, email, password]);
  if (result.affectedRows === 0) {
    return false;
  }
  return result;
};



const findById = async(id)=>{
  const select = `SELECT users.name as USUARIOS, class.name as CLASE, class.hour as HORA
        FROM users 
        INNER JOIN user_class ON user_class.fk_user = users.id 
        INNER JOIN class ON class.id = user_class.fk_class
        WHERE users.id = ?`
  const [result] =  await pool.query(select,[id]);
  if(result.length === 0){
    return false;
  }

  return result;

}


const findByIdAndDelete = async(id)=>{
  const deleteU =  "DELETE FROM users WHERE id = ?";
  const [result] = await pool.query(deleteU, [id]);
  if(result.affectedRows === 0){
    return false;
  }
  
  return result;

}

const findByIdAndUpdate = async(id, name, email, password) => {
  const insert =  "UPDATE users SET name = ? , email = ?, password = ? WHERE id = ?"
  const [result] = await pool.query(insert,[name, email, password, id]);
  if(result.affectedRows === 0){
    return false;
  }

  return result;

}



module.exports = { checkEmail, addUser, findById, findByIdAndDelete,findByIdAndUpdate};
