const router = require("express").Router();
const userCont = require("../../controllers/user.controlers");
const checkToken = require("../../middleware/auth")

router.post("/register",userCont.registerUser);
router.post("/login", userCont.login);
router.get("/profile",checkToken,userCont.getProfile);
router.delete("/delete/:id",checkToken,userCont.deleteUser);
router.put("/update/:id",checkToken,userCont.updateUser);



module.exports = router;