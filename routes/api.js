/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {

  app.route('/api/convert')
    .get((req, res) => {
      const convertHandler = new ConvertHandler(req.query.input);
      console.log(convertHandler);
      const result = convertHandler.toJSON();
      const resultString = {string: convertHandler.toText()};
      res.json(Object.assign(result, resultString));
    });
};
