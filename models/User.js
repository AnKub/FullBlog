import mongoose from "mongoose";

// создаем схему по которой мангоДВ создает поьзователей
const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    // если свойство обязательное указываем надпись сверху
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  avatarUrl: String,
  // если не обязательный, указываем это просто через двоеточие
},
{
  // єто значит что после получения необходимых данных создание сущности должно прекращаться
timestamps: true,
});

export default mongoose.model("User", UserSchema);