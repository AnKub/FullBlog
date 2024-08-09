import { validationResult } from 'express-validator';

// Middleware для обработки ошибок валидации
const validationMiddleware = (req, res, next) => {
  // Получаем ошибки валидации из запроса
  const errors = validationResult(req);

  // Проверяем, есть ли ошибки
  if (!errors.isEmpty()) {
    // Если есть ошибки, отправляем ответ с кодом 400 и массивом ошибок
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  
  // Если ошибок нет, передаем управление следующему middleware
  next();
};

export default validationMiddleware;
