const mongoose = require('mongoose')
const colors = require('colors')

exports.connect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log(`MongoDB connected: ${connect.connection.host}`.cyan.bold);
  } catch (error) {
    console.log('Database connection failed! Exiting now...');
    console.error(error);
    process.exit(1)
  }
}