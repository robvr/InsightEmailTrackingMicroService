let express = require('express');
let router = express.Router();
let mailEventsTrackingCtrl = require('../controllers/mailEventsTrackingController');

let mainRouter = () => {
  router.get('/', (req, res) => {
    res.send('OK');
  });

  router.get('/opened', mailEventsTrackingCtrl.mailOpenedEventTracker);
  router.get('/linkClicked', mailEventsTrackingCtrl.linkClickedTracker);

  return router;
};

module.exports = mainRouter;
