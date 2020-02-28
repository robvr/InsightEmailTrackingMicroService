let express = require('express');
let router = express.Router();
const config = require('../config/config');

let mainRouter = () => {
  router.get('/opened', (req, res) => {
    res.send('Email Opened');
  });

  router.get('/linkClicked', (req, res) => {
    res.send('Link Clicked');
  });

  return router;
};

module.exports = mainRouter;
