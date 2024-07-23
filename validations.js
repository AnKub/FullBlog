import {body} from 'express-validator';


export const loginValidation = [
  body('email', 'The mail form is not correct').isEmail(),
  body('password', 'Password must be min 5 symbols').isLength({min: 5}),  
];
export const registerValidation = [
  body('email', 'The mail form is not correct').isEmail(),
  body('password', 'Password must be min 5 symbols').isLength({min: 5}),
  body('fullName', 'Write the name, please').isLength({min: 3}),
  body('avatarUrl', 'Invalid link').optional().isURL(),
];
export const postCreateValidation = [
  body('title', 'Enter the title of the article').isLength({min:3}).isString(),
  body('text', 'Enter the text of the article').isLength({min: 5}).isString(),
  body('tags', 'the tag format incorrect(specify the array)').optional().isString(),
  body('imageUrl', 'The image link is invalid').optional().isString(),
];
