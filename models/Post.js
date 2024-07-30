import mongoose from "mongoose";

// Создаем схему для постов
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  // Поле обязательно для заполнения
  },
  text: {
    type: String,
    required: true,  // Поле обязательно для заполнения
   
  },
  tags: {
    type: [String],  // Используем тип массива строк для тегов
    default: [],    // Значение по умолчанию — пустой массив
  },
  viewsCount: {
    type: Number,
    default: 0,    // Значение по умолчанию — 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,  // Поле обязательно для заполнения
  },
  imageUrl: {
    type: String,   // Используем camelCase для имени поля
    default: '',    // Значение по умолчанию — пустая строка
  },
}, {
  timestamps: true,  // Автоматическое добавление полей createdAt и updatedAt
});

export default mongoose.model("Post", PostSchema);
