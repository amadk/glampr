var Trip = require('../models/index.js').Trip;
var Term = require('../models/index.js').Term;

var findAll = function(tripId, callback) {
  Term.findAll({where: {trip_id: tripId}}).then(function(terms) {
    callback(terms);
  })
}

var insertTerms = function(terms, tripId, callback) {
  var termsArr = []
  for (var category in terms) {
    for(var content in terms[category])
      if(content !== 'title') {
        termsArr.push({category: terms[category].title, description: terms[category][content]});        
      }
  }

  Trip.find({where: {id: tripId}}).then(function(trip) {
    var insertOne = function(termIndex) {
      if(termIndex === termsArr.length) {
        callback(terms);
        return;
      }
      Term.create(termsArr[termIndex]).then(function(term) {
        term.setTrip(trip).then(function() {
          insertOne(termIndex + 1);
        });
      });
    }
    insertOne(0);
  })
}


exports.findAll = findAll;
exports.insertTerms = insertTerms;










