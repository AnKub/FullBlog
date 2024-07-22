import express from "express";
import jwt from "jwt";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
   
  res.send('hello world');
});

app.post('/auth/login', (req, res) => {
  console.log(req.body);
  res.json ({
      success: true,
  });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});

