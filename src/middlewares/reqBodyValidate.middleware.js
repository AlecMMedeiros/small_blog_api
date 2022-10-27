const joiSchema = require('../utils/joiSchemas.util');

const newPostBody = async (req, res, next) => {
  const { error } = joiSchema.newPostSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};

const updatePostBody = async (req, res, next) => {
  const { error } = joiSchema.updatePostSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};

const userBody = async (req, res, next) => {
  const { error } = joiSchema.userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};

module.exports = {
  newPostBody,
  updatePostBody,
  userBody,
};
