require("dotenv").config();
const mongoose = require("mongoose");
const PrivateEntry = require("./Private_backend/models/PrivateEntry");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for data seeding..."))
  .catch((err) => console.log("Connection error:", err));

const initialData = [
  {
    title: "Cantabo1 Disabled Root",
    link: "ssh root@161.97.80.191",
    tags: ["Udemy$2024", "Work"],
  },
  {
    title: "Cantabo1 rahul",
    link: "ssh rahul@161.97.80.191",
    tags: ["Rahul@123", "Work"],
  },
  {
    title: "Cantabo2 Disabled Root",
    link: "ssh root@109.199.118.72",
    tags: ["Ankit123", "Work"],
  },
  {
    title: "Cantabo2 ankit",
    link: "ssh ankit@109.199.118.72",
    tags: ["Ankit@123", "Work"],
  },
  {
    title: "Cantabo3 Disabled Root",
    link: "ssh root@37.60.238.222",
    tags: ["Aman123", "Work"],
  },
  {
    title: "Cantabo3 ankit",
    link: "ssh aman@37.60.238.222",
    tags: ["Aman@123", "Work"],
  },
  {
    title: "Ubuntu Desktop",
    link: "ssh -p 2223 rahul@223.239.128.54",
    tags: ["ankit", "Work"],
  },
  {
    title: "Ubuntu server",
    link: "ssh -p 2222 rahul@223.239.128.54",
    tags: ["Work best", "rahul"],
  },
  {
    title: "Cantabo login custid : 14010496",
    link: "https://my.contabo.com/",
    tags: ["apeJnEuX6di2", "Work"],
  },
];

const seedDB = async () => {
  try {
    // I recommend clearing the collection first so you don't get 18 entries
    // if you run the script twice.
    await PrivateEntry.deleteMany({});
    console.log("Old entries cleared...");

    await PrivateEntry.insertMany(initialData);

    console.log("-----------------------------------------");
    console.log(`SUCCESS: ${initialData.length} entries added to the Vault!`);
    console.log("-----------------------------------------");
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seedDB();
