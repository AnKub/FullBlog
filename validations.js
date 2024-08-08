import { body } from 'express-validator';

export const registerValidation = [
  body('email')
    .isEmail().withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter'),
  body('fullName')
    .isLength({ min: 3 }).withMessage('Full name must be at least 3 characters long')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Full name can only contain letters and spaces'),
];

export const loginValidation = [
  body('email')
    .isEmail().withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

export const postCreateValidation = [
  body('title')
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long')
    .isString().withMessage('Title must be a string'),
  body('text')
    .isLength({ min: 10 }).withMessage('Text must be at least 10 characters long')
    .isString().withMessage('Text must be a string'),
  body('tags')
    .optional()
    .isArray().withMessage('Tags should be an array of strings')
    .custom(tags => {
      if (tags.length > 0 && !tags.every(tag => typeof tag === 'string')) {
        throw new Error('Each tag should be a string');
      }
      return true;
    }),
  body('imageUrl')
    .optional()
    .isURL().withMessage('Invalid image URL'),
];
