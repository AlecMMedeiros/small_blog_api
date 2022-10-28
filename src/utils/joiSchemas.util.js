const Joi = require('joi');

const errorMessage = 'Some required fields are missing';

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': errorMessage,
    'string.empty': errorMessage,
  }),
  password: Joi.string().required().messages({
    'any.required': errorMessage,
    'string.empty': errorMessage,   
  }),
});

const newPostSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': errorMessage,
    'string.empty': errorMessage,
  }),
  content: Joi.string().required().messages({
    'any.required': errorMessage,
  }),
  categoryIds: Joi.array().items(Joi.number().required()
    .messages({
      'any.required': 'one or more "categoryIds" not found',
    })).required().messages({ 'any.required': errorMessage }),
});

const updatePostSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': errorMessage,
    'string.empty': errorMessage,
  }),
  content: Joi.string().required().messages({
    'any.required': errorMessage,
  }),
});

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'string.min': '"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.min': '"email" must be a valid email',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be at least 6 characters long',
  }),
  image: Joi.string(),
});

const categotySchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': '"name" is required',
  }),
});

module.exports = {
  loginSchema,
  newPostSchema,
  updatePostSchema,
  userSchema,
  categotySchema,
};
