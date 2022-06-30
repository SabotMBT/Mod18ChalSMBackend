const router = require("express").Router();

const {
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
  userFollow,
  userUnFollow,
} = require("../../controllers/userController.js");

// /api/users
router.route("/").get(getAllUsers).post(createUser);

// api/users/:userId
router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser);

// /api/thoughts/:userId/following
router.route("/:userId/following").post(userFollow);

// /api/thoughts/:userId/following/:followingId
router.route("/:userId/following/:followingId").delete(userUnFollow);

module.exports = router;
