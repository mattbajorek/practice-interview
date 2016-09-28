var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  models.Person.findAll({
    include: [ models.Task ]
  }).then(function(people) {
    res.render('people/index', {
      user_id: req.session.user_id,
      email: req.session.user_email,
      logged_in: req.session.logged_in,
      people: people
    });
  });
});

router.get('/:person_id', function(req, res) {
  models.Person.findOne({
    where: {id: req.params.person_id},
    include: [ models.Task ]
  }).then(function(person) {
    res.render('people/person', {
      user_id: req.session.user_id,
      email: req.session.user_email,
      logged_in: req.session.logged_in,
      person: person
    });
  });
});

router.put('/:person_id', function(req, res) {
  models.Person.update({
    name: req.body.name
  },{
    where: {id: req.params.person_id}
  }).then(function() {
    res.redirect('/');
  });
});

router.post('/create', function(req, res) {
  models.Person.create({
    name: req.body.name
  }).then(function() {
    res.redirect('/');
  });
});

router.delete('/:person_id', function(req, res) {
  // Remove task associated with person
  models.Task.destroy({
    where: {
      person_id: req.params.person_id
    }
  }).then(function() {
    // Remove person
    models.Person.destroy({
      where: {
        id: req.params.person_id
      }
    }).then(function() {
      res.json({
        redirect: true
      });
    });
  });
});

module.exports = router;
