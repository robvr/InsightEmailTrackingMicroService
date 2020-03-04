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
  getMailOpenedEventTracker: (req, res) => {
    mailRepository.getAllMailOpenedData()
      .then(data => {
        res.send(data);
      }).catch((e) => {
        console.log(e);
        res.send(e);
      });
  },
  
  linkClickedTracker: (req, res) => {
    if (!req.query.info) {
      res.status(400);
      res.send('NOK');
    } else {
      let buff = new Buffer.from(req.query.info, 'base64');
      let text = buff.toString('ascii');
      let parameters = getUrlParametersInObj(text);
      if (!(parameters.receiverEmail && parameters.senderId && parameters.campaignId && parameters.linkId && parameters.url)) {
        res.status(400);
        res.send('NOK');
      } else {
        mailRepository.checkLinkClickedExistence(parameters)
          .then(data => {
            if (data) {
              // Link clicked exists => update data
              data['numberOfClicks']++;
              mailRepository.updateLinkClickedRecord(data).then(() => {
                redirectToUrl(res, parameters.url);
              });
            } else {
              // New link click
              mailRepository.saveLinkClickedRecord({
                senderId: parameters.senderId,
                receiverEmail: parameters.receiverEmail,
                campaignId: parameters.campaignId,
                linkId: parameters.linkId
              }).then(() => {
                redirectToUrl(res, parameters.url);
              });
            }
          });
      }
    }
  },

  getLinkClickedTracker: (req, res) => {
    mailRepository.getAllLinkClickedData()
      .then(data => {
        res.send(data);
      }).catch((e) => {
        console.log(e);
        res.send(e);
      });
  },
};

let redirectToUrl = (res, url) => {
  res.writeHead(301, { Location: url });
  res.end();
};

let getUrlParametersInObj = (urlParams) => {
  let parametersArray = urlParams.split('&');
  let temp, urlParameters = {};
  parametersArray.forEach(function(el) {
    temp = el.split('=');
    urlParameters[temp[0]] = temp[1];
  });

  return urlParameters;
};

module.exports = mailEventsTrackerCtrl;
