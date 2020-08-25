'use strict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai').expect;
const cors = require('cors');
const helmet = require('helmet');

const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');

const app = express();

// Log all requests
app.use((req, res, next) => {
  console.log(`${Date.now()}: ${req.method} ${req.path} - ${req.ip}`);
  console.log('  request params:');
  Object.keys(req.params)
      .forEach(key => console.log(`    ${key}: ${req.params[key]}`));
  console.log('  request query:');
  Object.keys(req.query)
      .forEach(key => console.log(`    ${key}: ${req.query[key]}`));
  next();
});

// Disable 'x-powered-by'
app.disable('x-powered-by');

// Use Helmet with default config options
// {
//   "headers": {
//       "content-security-policy": "default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
//       "x-dns-prefetch-control": "off",
//       "expect-ct": "max-age=0",
//       "x-frame-options": "SAMEORIGIN",
//       "strict-transport-security": "max-age=15552000; includeSubDomains",
//       "x-download-options": "noopen",
//       "x-content-type-options": "nosniff",
//       "x-permitted-cross-domain-policies": "none",
//       "referrer-policy": "no-referrer",
//       "x-xss-protection": "0"
// }
app.use(helmet());

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Index page (static HTML)
app.route('/')
    .get((req, res) => {
      res.sendFile(`${process.cwd()}/views/index.html`);
    });

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);

//404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404)
      .type('text')
      .send('Not Found');
});

//Start our server and tests!
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${listener.address().port}`);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(() => {
      try {
        runner.run();
      } catch (e) {
        const error = e;
        console.log('Tests are not valid:');
        console.log(error);
      }
    }, 1500);
  }
});

module.exports = app; //for testing
