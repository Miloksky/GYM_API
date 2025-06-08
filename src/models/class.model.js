//modelo de datos
const pool = require("../config/conexion");



const selectAll = async () => {
  const select = "SELECT * FROM class";
  const [result] = await pool.query(select);
  return result;
};





const createClass = async (data) => {
  const { name, hour } = data;
  const insert = "INSERT INTO class (name,hour) VALUES(?,?)";
  const [result] = await pool.query(insert, [name, hour]);
  if (result.affectedRows === 0) {
    return false;
  }
  return result;
};




const updateClass = async (id, data) => {
  const { name, hour } = data;
  const update = "UPDATE class SET name = ?,hour = ? WHERE id = ? ";
  const [result] = await pool.query(update, [name, hour, id]);
  if (result.affectedRows === 0) {
    return false;
  }

  return result;
};



const deleteClass = async (id) => {
    const deleteById = "DELETE FROM class WHERE id = ?" 
    const [result] = await pool.query(deleteById,[id])
    if(affectedRows === 0){
        return false;
    }
    return result;
}


const selectClassPage = async(page,limit) => {
  const offset = limit * (page-1);
  const select = "SELECT * from class LIMIT ? OFFSET ?";
  const [result] = await pool.query(select,[limit, offset]);
  return result;
}



const totalClasses = async () => {
  const [[{count}]] = await pool.query("SELECT COUNT(*) as count FROM class");
  return count;
}




module.exports = { selectAll, createClass, updateClass, deleteClass, selectClassPage, totalClasses };
