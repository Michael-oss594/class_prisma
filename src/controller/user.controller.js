const userService = require("../services/user.services");

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    const { password: _pw, ...safe } = user;
    res.success(safe, "User created successfully", 201);
  } catch (error) {
    next(error);
  }
};

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    const { password: _pw, ...safe } = user;
    res.success(safe, "Login successful");
  } catch (error) {
    next(error);
  }
}

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(parseInt(req.params.id));
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    const { password: _pw, ...safe } = user;
    res.success(safe, "User found");
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    const { password: _pw, ...safe } = updatedUser;
    res.success(safe, "User updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.success(result, "User deleted successfully");
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const users = await userService.getAllUsers(page, pageSize);
    const safeUsers = users.map(({ password, ...safe }) => safe);
    res.success(safeUsers, "Users retrieved successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
};