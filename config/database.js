const mongoose = require('mongoose')
const colors = require('colors')

exports.connect = async () => {
  try {
    const connect = await mongoose.connect('mongodb+srv://bykovskieug:17.04.1995@auth-jwt.h1hnptm.mongodb.net/?retryWrites=true&w=majority', {
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