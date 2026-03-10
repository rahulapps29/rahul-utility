require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ======================
   ROUTES
====================== */
const labelRoutes = require("./Label_backend/routes/LabelRoutes");
const emailRoutes = require("./Email_backend/routes/emailRoutes");
const urlRoutes = require("./Url_backend/routes/urlRoutes");
const tuyaRoutes = require("./Tuya_backend/routes/tuyaRoutes");
// NEW ROUTES
const authRoutes = require("./Private_backend/routes/authRoutes");
const privateRoutes = require("./Private_backend/routes/privateRoutes");

/* ======================
   MIDDLEWARE
====================== */
app.use(cors());
app.use(express.json());

/* ======================
   DATABASE CONNECTION
====================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("MongoDB Connection Failed:", err.message);
    process.exit(1);
  });

/* ======================
   ROUTE MOUNTING
====================== */
app.use("/label", labelRoutes);
app.use("/mailer", emailRoutes);
app.use("/urls", urlRoutes);
app.use("/tuya", tuyaRoutes);

// NEW MOUNTING
app.use("/auth", authRoutes); // Login/Auth
app.use("/private", privateRoutes); // Vault CRUD (Protected by middleware)

/* ======================
   SERVER START
====================== */
const PORT = process.env.PORT || 4028;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
