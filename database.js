const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGOURL);
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
