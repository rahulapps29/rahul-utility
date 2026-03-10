const mongoose = require("mongoose");

const PrivateEntrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
); // Automatically adds createdAt and updatedAt

module.exports = mongoose.model("PrivateEntry", PrivateEntrySchema);
