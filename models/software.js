const mongoose = require("mongoose");
const Joi = require("joi");

const softwareSchema = new mongoose.Schema({
  DisplayName: {
    required: true,
    trim: true,
    type: String,
    maxlength: 999
  },
  Publisher: {
    required: true,
    trim: true,
    type: String,
    maxlength: 999
  },
  DisplayVersion: {
    required: true,
    trim: true,
    type: String,
    maxlength: 999
  },
  InstallDate: {
    required: true,
    trim: true,
    type: String,
    maxlength: 999
  }
});

const softwareArraySchema = new mongoose.Schema({
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
  software : [softwareSchema]
})

function validateSoftwareArray(software) {
  const softwareSchema = {
    DisplayName: Joi.string()
      .min(0)
      .max(999)
      .required(),
    Publisher: Joi.string()
      .min(0)
      .max(999)
      .required(),
    DisplayVersion: Joi.string()
      .min(0)
      .max(999)
      .required(),
    InstallDate: Joi.string()
  };
  const arraySchema = Joi.array().items(Joi.object(softwareSchema));
  return Joi.validate(software, arraySchema);
}

const Software = mongoose.model("Software", softwareArraySchema);

module.exports.Software = Software;
module.exports.validateSoftwareArray = validateSoftwareArray;
