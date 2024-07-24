import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';

import {registerValidation, loginValidation, postCreateValidation} from './validations.js';
import {checkAuth, handleValidationErrors} from "./utils/index.js";
import {UserController, PostController} from './controllers/index.js';


mongoose
.connect('mongodb+srv://admin:wwwwww@cluster0.n7ssyno.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=> console.log('BASE ON'))
.catch((err)=> console.log('BASE off', err));

      // Обработка события отключения и переподключения
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose reconnected');
});
  
const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
  cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
    },
});

const upload = multer({storage});

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login',  loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors,  UserController.register );
app.get('/auth/me', checkAuth, UserController.getMe );

// download schem
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

// crud for posts

app.get('/posts', PostController.getAll );
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.post('/posts',checkAuth, postCreateValidation,handleValidationErrors, PostController.create);
app.delete('/posts/:id',checkAuth, PostController.remove);
app.patch('/posts/:id',checkAuth, postCreateValidation, handleValidationErrors, PostController.update);


app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});

