let MailOpenedModel = require('../models/openedMailModel');
let LinkClickedModel = require('../models/linkClickedModel');

let mailEventTrackerRepository = {
  checkTrackingExistence: query => {
    return new Promise((resolve, reject) => {
      MailOpenedModel.findOne({ receiverEmail: query.receiverEmail, senderId: query.senderId, campaignId: query.campaignId }, (err, data) => {
        if (err)
          reject(err);
        resolve(data);
      });
    });
  },
  saveEmailTrackRecord: mailTrackObj => {
    return new Promise((resolve, reject) => {
      let mailEvent = new MailOpenedModel(mailTrackObj);

      mailEvent.save()
        .then(doc => {
          console.log('U be save');
          resolve(doc);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updateEmailTrackRecord: mailTrackObj => {
    return new Promise((resolve, reject) => {
      MailOpenedModel.findByIdAndUpdate(mailTrackObj._id, mailTrackObj, { new: true }, (err, data) => {
        if (err)
          reject(err);
        resolve(data);
      });
    });
  },
  checkLinkClickedExistence: query => {
    return new Promise((resolve, reject) => {
      LinkClickedModel.findOne({ receiverEmail: query.receiverEmail, senderId: query.senderId, campaignId: query.campaignId, linkId: query.linkId }, (err, data) => {
        if (err)
          reject(err);
        resolve(data);
      });
    });
  },
  saveLinkClickedRecord: linkClickedObj => {
    return new Promise((resolve, reject) => {
      let linkClicked = new LinkClickedModel(linkClickedObj);

      linkClicked.save()
        .then(doc => {
          resolve(doc);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updateLinkClickedRecord: linkClickedObj => {
    return new Promise((resolve, reject) => {
      LinkClickedModel.findByIdAndUpdate(linkClickedObj._id, linkClickedObj, { new: true }, (err, data) => {
        if (err)
          reject(err);
        resolve(data);
      });
    });
  },
 
  getAllMailOpenedData: () => {
    return new Promise((resolve, reject) => {
      MailOpenedModel.find((err, data) => {
        if (err)
          reject();
        resolve(data);
      });
    });
  },
};

module.exports = mailEventTrackerRepository;
