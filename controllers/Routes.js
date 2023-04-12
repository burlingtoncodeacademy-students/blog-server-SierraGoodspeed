// controllers/routes.js

const express = require('express');
const router = express.Router();
const fs = require('fs');

// read blog posts from JSON file
function readPosts() {
  const data = fs.readFileSync('./api/blog.json', 'utf8');
  return JSON.parse(data);
}

// write blog posts to JSON file
function writePosts(posts) {
  const data = JSON.stringify(posts, null, 2);
  fs.writeFileSync('./api/blog.json', data);
}

// get all posts
router.get('/posts', (req, res) => {
  const posts = readPosts();
  res.json(posts);
});

// get post by id
router.get('/posts/:id', (req, res) => {
  const posts = readPosts();
  const post = posts.find(p => p.post_id === parseInt(req.params.id));
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
  } else {
    res.json(post);
  }
});

// create new post
router.post('/posts', (req, res) => {
  const posts = readPosts();
  const newPost = {
    post_id: posts.length + 1,
    title: req.body.title,
    author: req.body.author,
    body: req.body.body
  };
  posts.push(newPost);
  writePosts(posts);
  res.status(201).json(newPost);
});

// update post by id
router.put('/posts/:id', (req, res) => {
  const posts = readPosts();
  const post = posts.find(p => p.post_id === parseInt(req.params.id));
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
  } else {
    post.title = req.body.title || post.title;
    post.author = req.body.author || post.author;
    post.body = req.body.body || post.body;
    writePosts(posts);
    res.json(post);
  }
});

// delete post by id
router.delete('/posts/:id', (req, res) => {
  const posts = readPosts();
  const index = posts.findIndex(p => p.post_id === parseInt(req.params.id));
  if (index === -1) {
    res.status(404).json({ message: 'Post not found' });
  } else {
    posts.splice(index, 1);
    writePosts(posts);
    res.json({ message: 'Post deleted' });
  }
});

module.exports = router;
