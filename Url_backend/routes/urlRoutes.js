const express = require("express");
const router = express.Router();
const {
  createUrl,
  getUrls,
  updateUrl,
  deleteUrl,
  testRoute,
} = require("../controllers/urlController");

// Create
router.post("/", createUrl);

// Read
router.get("/", getUrls);

// Test
router.get("/test", testRoute);

// Update
router.put("/:id", updateUrl);

// Delete
router.delete("/:id", deleteUrl);

module.exports = router;
