let mailRepository = require('../repository/repository');

let mailEventsTrackerCtrl = {
  mailOpenedEventTracker: (req, res) => {
    if (!(req.query.receiverEmail && req.query.senderId && req.query.campaignId)) {
      res.status(400);
      res.send('NOK');
    } else {
      mailRepository.checkTrackingExistence(req.query)
        .then(data => {
          if (data) {
            // Mail Track already exists => update it
            data['numberOfViews']++;
            data['lastSeenActivity'] = new Date();
            mailRepository.updateEmailTrackRecord(data).then(res.send(''));
          } else {
            // Mail Track does not exist => create new one
            mailRepository.saveEmailTrackRecord({
              senderId: req.query.senderId,
              receiverEmail: req.query.receiverEmail,
              campaignId: req.query.campaignId
            }).then(res.send(''));
          }
        });
    }
  },
  linkClickedTracker: (req, res) => {
    if (!(req.query.receiverEmail && req.query.senderId && req.query.campaignId && req.query.linkId && req.query.url)) {
      res.status(400);
      res.send('NOK');
    } else {
      mailRepository.checkLinkClickedExistence(req.query)
        .then(data => {
          if (data) {
            // Link clicked exists => update data
            data['numberOfClicks']++;
            mailRepository.updateLinkClickedRecord(data).then(() => {
              redirectToUrl(res, req.query.url);
            });
          } else {
            // New link click
            mailRepository.saveLinkClickedRecord({
              senderId: req.query.senderId,
              receiverEmail: req.query.receiverEmail,
              campaignId: req.query.campaignId,
              linkId: req.query.linkId
            }).then(() => {
              redirectToUrl(res, req.query.url);
            });
          }
        });
    }
  }
};

let redirectToUrl = (res, url) => {
  res.writeHead(301, { Location: 'http://' + url });
  res.end();
};

module.exports = mailEventsTrackerCtrl;
