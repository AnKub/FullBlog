import express from 'express';
import mongoose from 'mongoose';
import {registerValidation} from './validations/auth.js';
import checkAuth from "./utils/checkAuth.js";

import * as UserController from './controllers/UserController.js';


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

app.use(express.json());

app.post('/auth/login', UserController.login);
app.post('/auth/register', registerValidation, UserController.register );
app.get('/auth/me', checkAuth, UserController.getMe );

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});

