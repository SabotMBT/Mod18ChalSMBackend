const router = require("express").Router();

const {
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../../controllers/userController.js");

// /api/users
router.route("/").get(getAllUsers).post(createUser);

// api/users/:userId
router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser);

module.exports = router;
