const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController")

// to create new user
router.post("/createUser", controller.createUser)

// to edit user details
router.put("/editUser", controller.editUser)

// to delete user details
router.delete("/deleteUser", controller.deleteUser)

// to get all user's details
router.get("/getUsers", controller.getUsers)

// to search function

module.exports = router;