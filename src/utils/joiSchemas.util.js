const Joi = require('joi');

const errorMessage = 'Some required fields are missing';

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

module.exports = {
  newPostSchema,
  updatePostSchema,
};
