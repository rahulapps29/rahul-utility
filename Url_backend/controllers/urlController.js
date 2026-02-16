const Url = require("../models/Url");

// Create URL
exports.createUrl = async (req, res) => {
  try {
    const { title, link, description } = req.body;

    const newUrl = new Url({
      title,
      link,
      description,
    });

    await newUrl.save();
    res.status(201).json(newUrl);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All URLs
exports.getUrls = async (req, res) => {
  try {
    const urls = await Url.find();
    res.json(urls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Test Route
exports.testRoute = (req, res) => {
  res.send("Server is running");
};

// Update URL
exports.updateUrl = async (req, res) => {
  try {
    const { title, link, description } = req.body;

    const updated = await Url.findByIdAndUpdate(
      req.params.id,
      { title, link, description },
      { new: true },
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete URL
exports.deleteUrl = async (req, res) => {
  try {
    await Url.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
