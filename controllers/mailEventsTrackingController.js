let mailRepository = require('../repository/repository');

let mailEventsTrackerCtrl = {
  mailOpenedEventTracker: (req, res) => {
   mailRepository.checkTrackingExistence(req.query)
     .then(data => {
       if (data) {
         // Mail Track already exists => update it
         data.numberOfViews++;
         data.lastSeenActivity = new Date();
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
  },

  getMailOpenedEventTracker: (req, res) => {
    mailRepository.getAllMailOpenedData()
      .then(data => {
        res.send(data);
      }).catch((e) => {
        console.log(e);
        res.send(e);
      });
   }
};

module.exports = mailEventsTrackerCtrl;
