const mongoose = require("mongoose");
const Joi = require("joi");

const firewallSchema = new mongoose.Schema({
  Name: {
    required: true,
    trim: true,
    type: String,
    maxlength: 99
  },
  Enabled: {
    required: true,
    trim: true,
    type: Boolean
  }
});

const firewallArraySchema = new mongoose.Schema({
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
    firewalls : [firewallSchema]
})

function validateFirewallArray(firewalls) {
  const firewallSchema = {
    Name: Joi.string()
      .min(0)
      .max(99),
      Enabled: Joi.boolean()
      .required()
  };
  const arraySchema = Joi.array().items(Joi.object(firewallSchema));
  return Joi.validate(firewalls, arraySchema);
}

const firewall = mongoose.model("firewall", firewallArraySchema);

module.exports.firewall = firewall;
module.exports.validateFirewallArray = validateFirewallArray;
