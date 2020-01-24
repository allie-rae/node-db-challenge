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
      res.status(500).json({ errorMessage: 'Failed to get projects from database.' });
    });
  });

  router.post('/', (req, res) => {
      Projects.add(req.body)
      .then(project => {
          res.status(200).json(project);
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({ errorMessage: 'Failed to post project to database.'});
      });
  });

  router.post('/:id/tasks', (req, res) => {
      Projects.addTask(req.body)
      .then(task => {
          res.status(200).json(task);
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({ errorMessage: 'Error posting task to database.'});
      });
  });

  router.post('/:id/resources', (req, res) => {
    Projects.addResource(req.body)
    .then(resource => {
        res.status(200).json(resource);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ errorMessage: 'Error posting resource to database.'});
    });
});

  router.get('/:id', (req, res) => {
      Projects.getProjectById(req.params.id)
      .then(project => {
          res.status(200).json(project);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({ errorMessage: 'Failed to retrieve project from database.'});
      });
  });


  router.get('/:id/tasks', (req, res) => {
    Projects.getTasks(req.params.id)
    .then(tasks => {
      res.status(200).json(tasks);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ errorMessage: 'Failed to retrieve tasks from database.' });
    });
  });



  router.get('/:id/resources', (req, res) => {
    Projects.getResources(req.params.id)
    .then(resources => {
      res.json(resources);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Failed to get resources from database.' });
    });
  });




  module.exports = router;