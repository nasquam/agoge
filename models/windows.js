const mongoose = require("mongoose");
const Joi = require("joi");

const windowsSchema = new mongoose.Schema({
  hostname: {
    required: true,
    trim: true,
    type: String,
    maxlength: 999
  },
  recordDate: {
    required: true,
    trim: true,
    type: Date,
    maxlength: 999
  },
  software: [softwareSchema],
  ip: [ipSchema],
  mac: [macSchema],
  admin: [adminSchema],
  services: [servicesSchema],
  process: [processSchema],
  firewall: [firewallSchema]
});

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

const ipSchema = new mongoose.Schema({
  interfaceAlias: {
    required: true,
    trim: true,
    type: String,
    maxlength: 999
  },
  IPAddress: {
    required: true,
    trim: true,
    type: IPAddress
  }
});

const macSchema = new mongoose.Schema({
  description: {
    required: true,
    trim: true,
    type: String,
    maxlength: 999
  },
  MACAddress: {
    required: true,
    trim: true,
    type: String
  }
});

const adminSchema = new mongoose.Schema({});

const servicesSchema = new mongoose.Schema({});

const processSchema = new mongoose.Schema({});

const firewallSchema = new mongoose.Schema({});
