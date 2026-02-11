const mongoose = require("mongoose");

const versionSchema = new mongoose.Schema({
  version: String,
  port: Number,
  active: Boolean,
  deployedAt: Date
});

module.exports = mongoose.model("Version", versionSchema);
