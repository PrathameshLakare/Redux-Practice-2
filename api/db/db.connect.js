const mongoose = require("mongoose");

const mongoUri = process.env.MONGODB_URI;

const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(mongoUri);
    if (connection) {
      console.log("Connected Successfully");
    }
  } catch (error) {
    console.log("Connection Failed", error);
  }
};

module.exports = { initializeDatabase };
