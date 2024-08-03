import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({ min: 4 }),
  body('fullName', 'Enter your full name').isLength({ min: 3 }),
];

