const express = require("express");
const router = express.Router();
const PrivateEntry = require("../models/PrivateEntry");
const auth = require("../middleware/auth"); // Ensures only logged-in users can access

// @route   GET /private
// @desc    Get all vault entries
router.get("/", auth, async (req, res) => {
  try {
    const entries = await PrivateEntry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   POST /private
// @desc    Add a new entry
router.post("/", auth, async (req, res) => {
  try {
    const { title, link, tags } = req.body;
    const newEntry = new PrivateEntry({ title, link, tags });
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(400).json({ message: "Error saving entry" });
  }
});

// Add this to Private_backend/routes/privateRoutes.js
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedEntry = await PrivateEntry.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }, // returns the modified document
    );
    res.json(updatedEntry);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
});

// @route   DELETE /private/:id
// @desc    Delete an entry
router.delete("/:id", auth, async (req, res) => {
  try {
    await PrivateEntry.findByIdAndDelete(req.params.id);
    res.json({ message: "Entry Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
