const mongoose = require("mongoose");
const Joi = require("joi");

const ipSchema = new mongoose.Schema({
  interfaceAlias: {
    required: true,
    trim: true,
    type: String,
    maxlength: 999
  },
  ipAddress: {
    required: true,
    trim: true,
    type: String
  }
});

const ipArraySchema = new mongoose.Schema({
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
    ips : [ipSchema]
})

function validateIPArray(IPs) {
  const ipSchema = {
    interfaceAlias: Joi.string()
      .min(0)
      .max(999),
    ipAddress: Joi.string()
      .min(0)
      .max(999)
      .required()
  };
  const arraySchema = Joi.array().items(Joi.object(ipSchema));
  return Joi.validate(IPs, arraySchema);
}

const ipAddress = mongoose.model("ipAddress", ipArraySchema);

module.exports.ipAddress = ipAddress;
module.exports.validateIPArray = validateIPArray;
