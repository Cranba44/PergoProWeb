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
router.delete("/deleteUser/:id", verifyToken, deleteUser);
router.patch("/update/:id", verifyToken, updateUser);
router.get("/getUserById/:id", verifyToken, getUserById)
module.exports = router;