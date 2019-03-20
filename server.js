const server = require('express')();

const postsRouter = require('./data/postsRouter.js');

server.use(require('express').json());

server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  res.send('Server is hot');
});

module.exports = server;
