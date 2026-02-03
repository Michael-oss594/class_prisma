const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const { signupSchema, loginSchema, updateUserSchema } = require('../middleware/requestValidation');

router.post('/signup', signupSchema, userController.createUser);
router.post('/login', loginSchema, userController.loginUser);
router.get('/:id', userController.getUserById);
router.put('/:id', updateUserSchema, userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/', userController.getAllUsers);


module.exports = router;