'use strict';

const express = require('express');

//eslint-disable-next-line new-cap
const router = express.Router();

const db = { posts: [{
  submitter: 'stanleypadles',
      title: 'Baby goat introduces himself to a horse',
        topic: 'awww',
        url: 'https://i.imgur.com/0NQmvQ7.gifv',
        votes: 1
      }, {
  submitter: 'stanleypaddles',
        title: 'React: Design Principles',
        topic: 'reactjs',
        url: 'https://facebook.github.io/react/contributing/design-principles.html',
        votes: 1
      }]
};

router.get('/posts', (req, res, next) => {
  res.send(db.posts);
});

router.post('/posts', (req, res, next) => {
  db.posts.push(req.body);

  res.send(req.body);
});

module.exports = router;
