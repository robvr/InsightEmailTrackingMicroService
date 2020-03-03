const mongoose = require('mongoose');
const validator = require('validator');

const schema = {
  senderId: { type: String, required: true },
  receiverEmail: {
    type: String,
    required: true,
    validate: (value) => {
      return validator.isEmail(value);
    }
  },
  campaignId: { type: String, required: true },
  linkId: { type: String, required: true },
  numberOfClicks: { type: Number, required: true, default: 1}

};

const collectionName = 'clicked_links';
const openedMailSchema = mongoose.Schema(schema);
const ClickedLinks = mongoose.model(collectionName, openedMailSchema);
module.exports = ClickedLinks;
