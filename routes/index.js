let express = require('express');
let router = express.Router();
let mailEventsTrackingCtrl = require('../controllers/mailEventsTrackingController');

let mainRouter = () => {
  router.get('/', (req, res) => {
    console.log(req);
    res.send('OK');
  });
  router.get('/opened', mailEventsTrackingCtrl.mailOpenedEventTracker);

  router.get('/linkClicked', (req, res) => {
    res.send('Link Clicked');
  });

  return router;
};

module.exports = mainRouter;
