const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }, // adds createdAt & updatedAt
);

module.exports = mongoose.model("Url", urlSchema);
