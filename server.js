// require( 'dotenv' ).config(); // looks for .env ; process.env gets it's values

const PORT = process.env.PORT || 8080;

// dependencies & setup
const express = require('express');
const mongoose = require('mongoose');
// const apiRouter = require('./ap_copied/router');
const app = express();


// for parsing incoming POST data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for serving all the normal html
app.use( express.static('public') );

// for routes
// apiRouter(app);

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/fitness_db',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

// == process-wide error handling
process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err);
    process.exit(1); //mandatory (as per the Node.js docs)
});

// routes
app.use(require("./routes/html_routes.js"));
// app.use(require("./routes/api_routes.js"));

app.listen(PORT, function() {
    console.log( `App on (database: ${process.env.DB_NAME}) on: https://localhost:${PORT}` );
});






