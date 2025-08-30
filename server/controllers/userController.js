const { User } = require("../models")
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
// const AppError = require("../utils/AppError")


// to create new user
exports.createUser = async (req, res, next) => {
  //
  console.log(req.body)
  const { fullName, email, userName, password, role, status, phone } = req.body;
  try {

    // check is user name already exist on db
    const isUserExist = await User.findOne({ where: { userName: userName } });

    if (isUserExist) {
      const error = new Error("User name is already exist, please enter different one");
      error.status = 400;
      error.path = "userName";
      throw error;
      //throw new AppError("User name is already exist, please enter different one", 400, "userName");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      fullName,
      email,
      userName,
      mobileNo: phone,
      userRole: role,
      status,
      password: hashedPassword,
    }

    // create user in db
    await User.create(newUser)

    res.status(201).json({ status: "ok", msg: "User creations success" })
  } catch (error) {
    return next(error);
  }
}

// to edit user data
exports.editUser = async (req, res, next) => {
  try {
    console.log(req.body);
    // return;
    const { userId } = req.params;
    const { fullName, email, userName, password, role, status, phone, changePassword } = req.body;

    // check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    // check if another user already uses the same username
    const existingUser = await User.findOne({
      where: { userName: userName, userId: { [Op.ne]: userId } },
    });

    if (existingUser) {
      const error = new Error("User name is already exist, please enter different one");
      error.status = 400;
      error.path = "userName";
      throw error;
    }
    if (changePassword) {
      const hashedPassword = await bcrypt.hash(password, 10);
    }
    // update fields
    user.fullName = fullName;
    user.email = email;
    user.userName = userName;
    user.mobileNo = phone;
    user.userRole = role;
    user.status = status;
    changePassword ? user.password = hashedPassword : user.password;

    await user.save();

    res.status(200).json({ status: "ok", msg: "User updated successfully" });
  } catch (error) {
    return next(error);
  }
};


// to delete user
exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId; // get userId from query parameter

  if (!userId) {
    const error = new Error("User ID is required");
    error.status = 400;
    return next(error);
  }

  try {
    // check if user exists
    const user = await User.findOne({ where: { userId } });
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      return next(error);
    }

    // delete user
    await User.destroy({ where: { userId } });

    res.status(200).json({
      status: "ok",
      msg: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// to get all user details
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    console.log(users.length)
    res.status(200).json({ status: "ok", msg: "All users found", data: users })
  } catch (error) {
    return next(error)
  }
}