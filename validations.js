import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({ min: 4 }),
  body('fullName', 'Enter your full name').isLength({ min: 3 }),
];

export const loginValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({ min: 4 }),
];

export const postCreateValidation = [
  body('title', 'Enter title of the post').isLength({ min: 3 }).isString(),
  body('text', 'Enter text of the post').isLength({ min: 10 }).isString(),
  body('tags', 'Invalid tags format (should be an array)').optional().isArray(),
  body('imageUrl', 'Invalid image link').optional().isString(),
];
