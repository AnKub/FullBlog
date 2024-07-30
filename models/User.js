import mongoose from "mongoose";

// Создаем схему для пользователей
const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true, 
    unique: true,    
  },
  passwordHash: {
    type: String,
    required: true,  
  },
  avatarUrl: {
    type: String,   
    default: '',     
  },
}, {
  timestamps: true, 
});

export default mongoose.model("User", UserSchema);
