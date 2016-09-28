var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.post('/:person_id/tasks/create', function (req, res) {
  models.Task.create({
    task: req.body.task,
    person_id: req.params.person_id
  }).then(function() {
    res.redirect('/');
  });
});

router.delete('/tasks/:task_id', function(req, res) {
  // Remove task associated with person
  models.Task.destroy({
    where: {
      id: req.params.task_id
    }
  }).then(function() {
    res.json({
      redirect: true
    });
  });
});

module.exports = router;
