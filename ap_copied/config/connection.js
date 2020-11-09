const mongoose = require( 'mongoose' );

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/fitness_db',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

module.exports = mongoose;