const router = require("express").Router();

router.use("/class",require("./api_routes/class.routes"));
router.use("/user",require("./api_routes/user.routes"));

module.exports = router;
