const postsRouter = require('express').Router();

const db = require('./db.js');

//-------- New Post  --------//
postsRouter.post('/', (req, res) => {
  const newPost = res.body;
  if (newPost.title && newPost.contents) {
    db.insert(newPost)
      .then(post => {
        res.status(201).json(newPost);
      })
      .catch(err => {
        res.status(501).json({ message: 'Failed to add Post' });
      });
  } else {
    res.status(400).json({
      Message: 'Please provide title and contents for the post.'
    });
  }
});

// ------Get all Posts-------//
postsRouter.get('/', (req, res) => {
  db.find()
    .then(posts => {
      res.status(202).json(posts);
    })
    .catch(err => {
      res.status(501).json({ message: 'Failed To Get Posts' });
    });
});

// // --------------------------------- DELETE -----------------------------------//
postsRouter.delete('/:id', async (req, res) => {
  try {
    const count = await post.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The post cant sit with us!' });
    } else {
      res.status(404).json({ message: 'Looked, didnt find nothing, fam...' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Tried to remove post, but it told me no...'
    });
  }
});

// // --------------------------------- PUT -----------------------------------//
postsRouter.put('/:id', async (req, res) => {
  try {
    const post = await post.update(req.params.id, req.body);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'I cant find post! Oh nooo!' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error Error! Cant update post!'
    });
  }
});

module.exports = postsRouter;
