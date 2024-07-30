import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Извлекаем токен из заголовков запроса
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '').trim();

  if (token) {
    try {
      // Проверяем токен и декодируем его
      const decoded = jwt.verify(token, 'secret123');
      req.userId = decoded._id; // Присваиваем decoded._id в req.userId
      next(); // Переходим к следующему middleware или обработчику запроса
    } catch (e) {
      // Возвращаем ошибку, если токен невалиден
      return res.status(403).json({
        message: 'No access'
      });
    }
  } else {
    // Возвращаем ошибку, если токен отсутствует
    return res.status(403).json({
      message: 'No access'
    });
  }
};

export default authMiddleware;

