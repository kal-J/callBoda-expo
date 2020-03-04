const mongoose = require("mongoose");
const uploadBasePath = "uploads";

const BodaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  district: {
    type: String,
    required: true,
    trim: true
  },
  subcounty: {
    type: String,
    required: true,
    trim: true
  },
  stage: {
    type: String,
    required: true,
    trim: true
  },
  telephone: {
    type: String,
    required: true,
    trim: true
  },
  approved: {
    type: String,
    required: true,
    default: "false"
  },
  img: { 
    image: Buffer, 
    contentType: String 
  }
});

const Boda = mongoose.model("Boda", BodaSchema);
module.exports = Boda;
module.exports.uploadBasePath = uploadBasePath;
