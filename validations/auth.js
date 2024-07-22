import {body} from 'express-validator';


export const registerValidation = [
  body('email', 'The mail form is not correct').isEmail(),
  body('password', 'Password must be min 5 symbols').isLength({min: 5}),
  body('fullName', 'Write the name, please').isLength({min: 3}),
  body('avatarUrl', 'Invalid link').optional().isURL(),
]