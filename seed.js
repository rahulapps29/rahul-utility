require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// Ensure this path matches where you saved the User model
const User = require("./Private_backend/models/User");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding..."))
  .catch((err) => console.log("Connection error:", err));

const seedAdmin = async () => {
  try {
    // 1. Check if admin already exists to avoid duplicates
    const existingUser = await User.findOne({ username: "admin" });
    if (existingUser) {
      console.log("Admin user already exists.");
      process.exit();
    }

    // 2. Hash your chosen password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Udemy$2026", salt);

    // 3. Create and Save
    const admin = new User({
      username: "admin",
      password: hashedPassword,
    });

    await admin.save();
    console.log("-----------------------------------------");
    console.log("SUCCESS: Admin user created!");
    console.log("Username: admin");
    // console.log("Password: YourSecretPassword123");
    console.log("-----------------------------------------");

    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seedAdmin();
