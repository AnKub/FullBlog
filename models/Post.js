import mongoose from "mongoose";

// создаем схему по которой мангоДВ создает поьзователей
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    // если свойство обязательное указываем надпись сверху
  },
  text:{
    type: String,
    required: true,
    unique: true,
  },
  tags: {
    type: Array,
    rdefault: [],
  },
  viewsCount: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ImageUrl: String,
 },
{
  // єто значит что после получения необходимых данных создание сущности должно прекращаться
timestamps: true,
});

export default mongoose.model("Post", PostSchema);