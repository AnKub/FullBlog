import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';
import PostModel from '../models/Post.js';

// --- User Controller ---

export const register = async (req, res) => {
  try {
    const { email, fullName, avatarUrl, password } = req.body;

    // Проверка на обязательные поля
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: 'Email, full name, and password are required' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new UserModel({
      email,
      fullName,
      avatarUrl,
      passwordHash: hash,
    });

    await user.save();

    const token = jwt.sign(
      { _id: user._id },
      'secret123',
      { expiresIn: '30d' }
    );

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

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isValidPass = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPass) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { _id: user._id },
      'secret123',
      { expiresIn: '30d' }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Access denied' });
  }
};

// --- Post Controller ---

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();
    const tags = [...new Set(posts.flatMap(post => post.tags))].slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching tags' });
  }
};

export const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const posts = await PostModel.find()
      .populate('user')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .exec();

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await PostModel.findByIdAndUpdate(
      postId,
      { $inc: { viewsCount: 1 } },
      { new: true, runValidators: true }
    ).populate('user');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching post' });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const result = await PostModel.findByIdAndDelete(postId);

    if (!result) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error removing post' });
  }
};

export const create = async (req, res) => {
  try {
    const { title, text, tags, imageUrl } = req.body;

    // Проверка на обязательные поля
    if (!title || !text) {
      return res.status(400).json({ message: 'Title and text are required' });
    }

    // Убедимся, что tags - это массив строк
    const tagsArray = Array.isArray(tags) ? tags : [];

    const post = new PostModel({
      title,
      text,
      tags: tagsArray,
      imageUrl,
      user: req.userId,
    });

    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating post' });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, text, imageUrl, tags } = req.body;

    // Проверка на обязательные поля
    if (!title || !text) {
      return res.status(400).json({ message: 'Title and text are required' });
    }

    // Убедимся, что tags - это массив строк
    const tagsArray = Array.isArray(tags) ? tags : [];

    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { title, text, imageUrl, user: req.userId, tags: tagsArray },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ success: true, post: updatedPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating post' });
  }
};
