const { User } = require("../models")
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

    const newUser = {
      fullName,
      email,
      userName,
      mobileNo: phone,
      userRole: role,
      status,
      password,
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
  //
}

// to delete user
exports.deleteUser = async (req, res, next) => {

}

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