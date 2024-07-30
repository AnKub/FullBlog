import { validationResult } from 'express-validator';

const validationMiddleware = (req, res, next) => {
  // Получаем ошибки валидации из запроса
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  
  next();
};

export default validationMiddleware;

