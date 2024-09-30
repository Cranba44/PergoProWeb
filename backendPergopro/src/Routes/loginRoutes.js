const router = require("express").Router();
const {
  login,
  signUp,
  getRefreshToken,
  getAllUsers,
  deleteUser,
  updateUser,
  getUserById,
} = require("../Controllers/loginController");

const verifyToken = require("../Middlewares/auth");

router.post("/signUp", signUp);
router.post("/login", login);
router.get("/users", getAllUsers);
router.get("/getRefreshToken", verifyToken, getRefreshToken);
router.delete("/deleteUser/:id",  deleteUser);
router.patch("/update/:id",  updateUser);
router.get("/getUserById/:id", getUserById)
module.exports = router;