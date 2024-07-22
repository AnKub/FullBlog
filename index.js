import express from "express";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';

mongoose
.connect('mongodb+srv://admin:wwwwww@cluster0.n7ssyno.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
).then(()=>console.log('DB ok'))
.catch(()=> console.log('DB error', err));


const app = express();

app.use(express.json());

app.get('/', (req, res) => {   
  res.send('hello world');
});

app.post('/auth/login', (req, res) => {
  console.log(req.body);

if (req.body.mail === 'test@test.ua') {
  const token = jwt.sign({
// шифруем инфу
    email: req.body.email,
    fullNmae: "Angus Mortadelius",
  }, 
  'secret123',);
}



  res.json ({
      success: true,
      token,
  });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});

