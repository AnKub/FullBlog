import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';

import { registerValidation, loginValidation, postCreateValidation } from './validations.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';
import { UserController, PostController } from './controllers/index.js';

// Подключение к MongoDB
mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.n7ssyno.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

// Обработка событий подключения и отключения
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose reconnected');
});

const app = express();

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads'); // Папка для хранения загруженных файлов
  },
  filename: (_, file, cb) => {
    // Добавляем текущую дату и время к имени файла для уникальности
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Middleware для обработки JSON и CORS
app.use(express.json());
app.use(cors());

// Статическая папка для загрузок
app.use('/uploads', express.static('uploads'));

// Роуты для аутентификации
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

// Роут для загрузки файлов
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  // Проверяем, что файл был загружен
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Возвращаем URL загруженного файла
  res.json({
    url: `/uploads/${req.file.filename}`, // Используем filename, чтобы соответствовать имени файла
  });
});

// Роуты для управления постами
app.get('/tags', PostController.getLastTags);
app.get('/posts', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);

// Обработка ошибок (универсальный обработчик ошибок)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Запуск сервера
app.listen(4444, (err) => {
  if (err) {
    return console.error('Failed to start server:', err);
  }
  console.log('Server is running on port 4444');
});
