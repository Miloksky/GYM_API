//crear funciones para acceder a la coleccion de datos
const classModel= require("../models/class.model");

const getClasses = async (req,res) => {
    try {
         const result = await classModel.selectAll();
         res.json(result);    
    } catch (error) {
        res.json(error)
    }
}


const createClasses = async (req,res) => {
    try {
        const result = await classModel.createClass(req.body);
        if(!result){
            return res.status(400).json({
                msg: "no se inserto la clase"
            });
        }

        res.status(201).json({classId: result.insertId});
    } catch (error) {
        res.status(500).json(error);
    }
    
}


const updateClasses = async (req,res) => {
    try {
        const {id} = req.params;
    const result = await classModel.updateClass(id, req.body);
    if(!result){
        res.status(400).json({
            msg: "clase no encontrada o no modificada"
        });
    }
    res.status(201).json({
        msg : "clase actualizada",
        class: result
    });
    } catch (error) {
        res.status(500).json(error);
    }

    
}

const deleteClasses = async (req,res) => {
    try {
        
    const {id} = req.params;
    const result = await classModel.deleteClass(id);
    if(!result){
        return res.status(400).json({
            msg : "no se elimino la clase"
        });
    }

    res.status(201).json({
        msg: " la clase se ha eliminado",
        class : result
    });


    } catch (error) {
        res.status(500).json(error);
    }

   
};


const getList = async(req,res)=>{
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const dataForPages = await classModel.selectClassPage(page,limit);
    if(dataForPages.length === 0){
        return res.status(404).json({
            msg : "página sin datos"
        });
    }

    const total = await classModel.totalClasses();
    const totalPages = Math.ceil(total/limit);
    res.status(200).json({
        dataForPages : dataForPages,
        maxPages: totalPages
    });
}



module.exports = {getClasses,createClasses,updateClasses,deleteClasses,getList};
