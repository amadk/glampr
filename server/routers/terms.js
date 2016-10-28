var express = require('express');
var termsController = require('../../db/controllers/terms.js');

var router = express.Router();

router.route('/maker')
  .post(function(req, res) {
    console.log(req.body)
      termsController.insertTerms(req.body.terms, req.body.tripId, function(data) {
        console.log('Inserted new terms')
        console.log('data in database: ', data);
        res.send('done')
      })
    })

router.route('/user/:tripId')
  .post(function(req, res) {
      
    })
  .get(function(req, res) {
      termsController.findAll(req.params.tripId, function(terms) {
        console.log(terms);
        res.json(terms)
      })
    })


module.exports = router;  