# 🖥️ React Blog Backend

## 🚀 Project Overview
This is the backend part of the full blog application, built using Node.js and Express. It manages authentication, CRUD operations for posts, and file uploads.

## 📌 Key Technologies
- 🚀 **Node.js & Express** – Backend framework
- 🔒 **JWT (jsonwebtoken)** – User authentication
- 🛡️ **Express Validator** – Input validation
- 🔄 **Mongoose** – MongoDB object modeling
- 🔑 **bcrypt** – Password hashing
- 🌍 **CORS** – Cross-origin resource sharing
- 📂 **Multer** – File uploads

## 📂 Project Structure
```plaintext
📦 fullblog
 ┣ 📂 controllers    # Business logic
 ┣ 📂 models         # Mongoose schemas
 ┣ 📂 routes         # API endpoints
 ┣ 📂 middleware     # Authentication and validation
 ┣ 📂 uploads        # Uploaded files (if applicable)
 ┣ 📜 index.js       # Entry point
 ┣ 📜 package.json   # Project configuration
 ┗ 📜 README.md      # Documentation
```

## 🛠 Getting Started
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server in development mode:
   ```sh
   npm run start:dev
   ```
3. Start the server in production mode:
   ```sh
   npm start
   ```

## 📡 API Endpoints
- **Auth**
  - `POST /auth/register` – User registration
  - `POST /auth/login` – User login
  - `GET /auth/me` – Get current user info

- **Posts**
  - `GET /posts` – Fetch all posts
  - `GET /posts/:id` – Fetch single post
  - `POST /posts` – Create a post
  - `PATCH /posts/:id` – Update a post
  - `DELETE /posts/:id` – Delete a post

- **File Upload**
  - `POST /upload` – Upload an image

## 🔑 Authentication & Security
- Uses **JWT tokens** for user authentication.
- Passwords are hashed using **bcrypt**.
- Input data is validated using **express-validator**.

## 🗂 Database
- Uses **MongoDB** with **Mongoose** for schema modeling.
- Ensure MongoDB is running before starting the server.

## 📜 License
This project is open-source. Feel free to use and modify! ✨

