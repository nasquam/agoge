const mongoose = require("mongoose");
const Joi = require("joi");

const serviceSchema = new mongoose.Schema({
  DisplayName: {
    required: true,
    trim: true,
    type: String,
    maxlength: 999
  },
  Status: {
    required: true,
    trim: true,
    type: String
  }
});

const serviceArraySchema = new mongoose.Schema({
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
  serviceCount : {
    required : true,
    type : Number,
  },
  services: [serviceSchema]
});

function validateServicesArray(services) {
  const serviceSchema = {
    DisplayName: Joi.string()
      .min(0)
      .max(999),
    Status: Joi.string()
      .min(0)
      .max(999)
      .required()
  };
  const arraySchema = Joi.array().items(Joi.object(serviceSchema));
  return Joi.validate(services, arraySchema);
}

const service = mongoose.model("service", serviceArraySchema);

module.exports.service = service;
module.exports.validateServicesArray = validateServicesArray;
