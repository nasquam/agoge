const mongoose = require("mongoose");
const Joi = require("joi");

const macSchema = new mongoose.Schema({
  description: {
    required: true,
    trim: true,
    type: String,
    maxlength: 999
  },
  macAddress: {
    required: true,
    trim: true,
    type: String
  }
});

const macArraySchema = new mongoose.Schema({
  hostname: {
    required: true,
    trim: true,
    type: String,
    maxlength: 999
  },
  dateAdded: {
    required: true,
    trim: true,
    type: Date,
    maxlength: 999
  },
  macs: [macSchema]
});

function validateMACArray(macs) {
  const macSchema = {
    description: Joi.string()
      .min(0)
      .max(999),
    macAddress: Joi.string()
      .min(0)
      .max(999)
      .required()
  };
  const arraySchema = Joi.array().items(Joi.object(macSchema));
  return Joi.validate(macs, arraySchema);
}

const macAddress = mongoose.model("macAddress", macArraySchema);

module.exports.macAddress = macAddress;
module.exports.validateMACArray = validateMACArray;
