const mongoose = require("mongoose");
const Joi = require("joi");

const adminSchema = new mongoose.Schema({
  Name: {
    required: true,
    trim: true,
    type: String,
    maxlength: 999
  }
});

const adminArraySchema = new mongoose.Schema({
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
      adminCount : {
        required : true,
        type : Number,
      },
    admins : [adminSchema]
})

function validateAdminArray(admins) {
  const adminSchema = {
    Name: Joi.string()
      .min(0)
      .max(999)
  };
  const arraySchema = Joi.array().items(Joi.object(adminSchema));
  return Joi.validate(admins, arraySchema);
}

const adminLocal = mongoose.model("adminslocal", adminArraySchema);

module.exports.adminLocal = adminLocal;
module.exports.validateAdminArray = validateAdminArray;
