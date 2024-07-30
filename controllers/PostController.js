import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';
import PostModel from '../models/Post.js';

// --- User Controller ---

export const register = async (req, res) => {
  try {
    const { email, fullName, avatarUrl, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email,
      fullName,
      avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      { _id: user._id },
      'secret123',
      { expiresIn: '30d' }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Houston, we have a problem' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isValidPass = await bcrypt.compare(password, user._doc.passwordHash);
    if (!isValidPass) {
      return res.status(400).json({ message: 'Incorrect login or password' });
    }

    const token = jwt.sign(
      { _id: user._id },
      'secret123',
      { expiresIn: '30d' }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
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
    console.log(err);
    res.status(500).json({ message: 'No access' });
  }
};

// --- Post Controller ---

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();
    const tags = [...new Set(posts.map((obj) => obj.tags).flat())].slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Some trouble with GET' });
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
    console.log(err);
    res.status(500).json({ message: 'Some trouble with GET' });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { new: true, runValidators: true }
    ).populate('user');

    if (!post) {
      return res.status(404).json({ message: 'Didn’t find post' });
    }

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = await PostModel.findOneAndDelete({ _id: postId });

    if (!doc) {
      return res.status(404).json({ message: 'Didn’t find post' });
    }

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const create = async (req, res) => {
  try {
    const { title, text, tags, imageUrl } = req.body;

    const doc = new PostModel({
      title,
      text,
      tags: tags.split(','),
      imageUrl,
      user: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Some trouble with create post' });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, text, imageUrl, tags } = req.body;

    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { title, text, imageUrl, user: req.userId, tags: tags.split(',') },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ success: true, post: updatedPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Trouble with post update' });
  }
};
