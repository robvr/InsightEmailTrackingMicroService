let MailOpenedModel = require('../models/openedMailModel');

let mailEventTrackerRepository = {
  checkTrackingExistence: query => {
    return new Promise((resolve, reject) => {
      MailOpenedModel.findOne({ receiverEmail: query.receiverEmail, senderId: query.senderId, campaignId: query.campaignId }, (err, data) => {
        if (err)
          reject();
        resolve(data);
      });
    });
  },
  saveEmailTrackRecord: mailTrackObj => {
    return new Promise((resolve, reject) => {
      let mailEvent = new MailOpenedModel(mailTrackObj);
      mailEvent.save()
        .then(doc => {
          resolve(doc);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updateEmailTrackRecord: mailTrakObj => {
    return new Promise((resolve, reject) => {
      MailOpenedModel.findByIdAndUpdate(mailTrakObj._id, mailTrakObj, { new: true }, (err, data) => {
        if (err)
          reject();
        resolve(data);
      });
    });
  }
};

module.exports = mailEventTrackerRepository;
