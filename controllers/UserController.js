import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';

// --- User Controller ---

export const register = async (req, res) => {
  try {
    const { email, fullName, avatarUrl, password } = req.body;

    // Проверка на наличие обязательных полей
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Хэширование пароля
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Создание нового пользователя
    const doc = new UserModel({
      email,
      fullName,
      avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    // Создание JWT токена
    const token = jwt.sign(
      { _id: user._id },
      'secret123',  // Замените на переменную окружения в реальной среде
      { expiresIn: '30d' }
    );

    // Возвращаем данные пользователя без пароля и JWT токен
    const { passwordHash, ...userData } = user._doc;
    res.json({ ...userData, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Проверка на наличие обязательных полей
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValidPass = await bcrypt.compare(password, user._doc.passwordHash);
    if (!isValidPass) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Создание JWT токена
    const token = jwt.sign(
      { _id: user._id },
      'secret123',  // Замените на переменную окружения в реальной среде
      { expiresIn: '30d' }
    );

    // Возвращаем данные пользователя без пароля и JWT токен
    const { passwordHash, ...userData } = user._doc;
    res.json({ ...userData, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Authorization failed' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Возвращаем данные пользователя без пароля
    const { passwordHash, ...userData } = user._doc;
    res.json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Access denied' });
  }
};
