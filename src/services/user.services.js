const { prisma } = require("../lib/prisma");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");

async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });
  return user;
}

async function loginUser(email, password) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid password", 401);
  }
  return user;
}

async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
}

async function updateUser(id, data) {
  const updateData = { ...data };
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }
  const updatedUser = await prisma.user.update({
    where: { id },
    data: updateData,
  });
  if (!updatedUser) {
    throw new AppError("User not found", 404);
  }
  return updatedUser;
}

async function deleteUser(id) {
  await prisma.user.delete({
    where: { id },
  });
  return { message: "User deleted successfully" };
}

async function getAllUsers(page, pageSize) {
  const users = await prisma.user.findMany({
    skip: (page - 1) * pageSize, 
    take: pageSize, 
  });
  return users;
}

module.exports = {
  createUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
};