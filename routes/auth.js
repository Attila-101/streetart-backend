const express = require("express");
const router = express.Router();
const { signup, signin, signup2 } = require("../controllers/auth");
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/test",signup2)
module.exports = router;
