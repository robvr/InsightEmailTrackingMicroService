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
  lastSeenActivity: { type: Date, require: true, default: new Date() },
  numberOfViews: { type: Number, required: true, default: 0}

};

const collectionName = 'opened_mails';
const openedMailSchema = mongoose.Schema(schema);
const OpenedMail = mongoose.model(collectionName, openedMailSchema);
module.exports = OpenedMail;
