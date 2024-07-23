// crud minimal
import PostModel from '../models/Post.js';

export const create = async (req, res) => {
  try {
    const doc = PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Somthings went wrong',
    });
  }
};