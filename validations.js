import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
  body('fullName', 'Full name must be at least 3 characters long and contain only letters and spaces').isLength({ min: 3 }).matches(/^[a-zA-Z\s]+$/),
];

export const loginValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
];

export const postCreateValidation = [
  body('title', 'Title must be at least 3 characters long').isLength({ min: 3 }).isString(),
  body('text', 'Text must be at least 10 characters long').isLength({ min: 10 }).isString(),
  body('tags', 'Tags should be an array of strings').optional().isArray().custom(tags => {
    if (tags.some(tag => typeof tag !== 'string')) {
      throw new Error('Each tag should be a string');
    }
    return true;
  }),
  body('imageUrl', 'Invalid image URL').optional().isURL(),
];
