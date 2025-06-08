const router = require('express').Router();
const classCont = require("../../controllers/class.controllers");

router.get("/classes",classCont.getClasses);
router.post("/create",classCont.createClasses);
router.put("/update/:id",classCont.updateClasses);
router.delete("/delete/:id",classCont.deleteClasses);
router.get("/list", classCont.getList)

module.exports = router;
