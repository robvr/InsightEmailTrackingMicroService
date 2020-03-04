let express = require('express');
let router = express.Router();
let mailEventsTrackingCtrl = require('../controllers/mailEventsTrackingController');

let mainRouter = () => {
  router.get('/', mailEventsTrackingCtrl.getMailOpenedEventTracker);
  router.get('/opened', mailEventsTrackingCtrl.mailOpenedEventTracker);
  router.get('/linkClicked', mailEventsTrackingCtrl.linkClickedTracker);
  router.get('/getLinkClicked', mailEventsTrackingCtrl.getLinkClickedTracker);

  return router;
};

module.exports = mainRouter;
