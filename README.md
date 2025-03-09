# 📖 Blog Backend

This project is a backend for a blog web page. It is built using the following tools and technologies:

## 🛠 Tools and Technologies

- **Node.js and Express**: The main platform for creating the server and handling HTTP requests.
- **Mongoose**: A library for working with MongoDB, used to create data models and interact with the database.
- **Nodemon**: A tool for automatically restarting the server when changes are made to the code.
- **body-parser**: Middleware for parsing the request body, necessary for processing JSON and URL-encoded data.
- **JWT**: Used for user authentication.

## 🔧 Methods Used

- **CRUD Operations**: Implementing functions to create, read, update, and delete posts.
- **Asynchronous Functions**: Using async/await to handle asynchronous operations.
- **Error Handling**: Logging and handling errors to ensure reliability.

## 📋 Example Code

Here is an example method for updating a post:

```javascript
export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags,
      },
      {
        new: true,
        runValidators: true,
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
```

## 🚀 Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed:

```sh
node -v
npm -v
```

### Installation

1. Clone the repo:

   ```sh
   git clone https://github.com/AnKub/FullBlog.git
   ```

2. Install NPM packages:

   ```sh
   npm install
   ```

3. Create a `.env` file and configure your environment variables.

### Usage

To start the server:

```sh
npm run dev
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request





