const joi = require("joi");

const userSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const signupSchema = userSchema;

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(6)
    .required(),
});

const updateUserSchema = joi.object({ 
  name: joi.string().min(3).max(30),
  email: joi.string().email(),
  password: joi.string().min(6)
});

// Validation middleware factory
function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: "error", message: error.details[0].message });
    }
    next();
  };
}

module.exports = {
  signupSchema: validate(signupSchema),
  loginSchema: validate(loginSchema),
  updateUserSchema: validate(updateUserSchema),
};