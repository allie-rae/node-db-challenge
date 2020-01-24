const express = require('express');

const Projects = require('./projects-model');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
    .then(recipes => {
      res.status(200).json(recipes);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Failed to get projects' });
    });
  });

  router.post('/', (req, res) => {
      let projectData = req.body;
      Projects.add(projectData)
      .then(project => {
          res.status(200).json(project)
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({ errorMessage: 'Failed to post project to database.'})
      })
  })


  router.get('/:id/tasks', (req, res) => {
    Projects.getTasks(req.params.id)
    .then(tasks => {
      res.status(200).json(tasks);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Failed to get tasks' });
    });
  });

  router.get('/:id/resources', (req, res) => {
    Projects.getResources(req.params.id)
    .then(resources => {
      res.json(resources);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Failed to get resources' });
    });
  });




  module.exports = router;