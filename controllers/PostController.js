import PostModel from '../models/Post.js';

// getTags
export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts.map((obj) => obj.tags).flat().slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Some trouble with GET',
    });
  }
};

// take all posts
export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Some trouble with GET',
    });
  }
};

// views+ and take one posts by id
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after', new: true } // `return update doc
    ).populate('user');

    if (!post) {
      return res.status(404).json({
        message: 'Didnt find post',
      });
    }

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

// delete post
export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = await PostModel.findOneAndDelete({ _id: postId });

    if (!doc) {
      return res.status(404).json({
        message: 'Didn’t find post',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};


// Создание поста
export const create = async (req, res) => {
  try {
    const doc = new PostModel({
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
      message: 'Some trouble with create post',
    });
  }
};

// update 
export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    // Обновляем документ по id и возвращаем обновлённый документ
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,  // убедитесь, что req.userId существует и имеет правильное значение
        tags: req.body.tags,
      },
      {
        new: true,  // возвращаем обновлённый документ
        runValidators: true,  // проверяем валидность данных перед обновлением
      }
    );

    if (!updatedPost) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }

    res.json({
      success: true,
      post: updatedPost,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Trouble with post update',
    });
  }
};

