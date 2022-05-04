const { register, login, setAvatar, logOut, getAllUsers } = require("../controllers/userController");

const router = require("express").Router();


router.post("/register", register);
router.post("/login", login);
router.post("/logout/:id", logOut);
router.post("/setAvatar/:id", setAvatar);
router.get("/allusers/:id", getAllUsers);

module.exports = router;