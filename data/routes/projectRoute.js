const express = require('express');

const router = express.Router();
const projectDb = require('../helpers/projectModel')

router.post('/', (req, res) => {
  projectDb.insert(req.body)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(err => {
      res.status(500).json({message: "server error"})
    })
})

router.get('/', (req, res) => {
  projectDb.get()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
      res.status(500).json({message: "server error"})
    })
})

router.get('/:id', (req, res) => {
  projectDb.get(req.params.id)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(err => {
      res.status(500).json({message: "server error"})
    })
})

router.put('/:id', (req, res) => {
  projectDb.update(req.params.id, req.body)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(err => {
      res.status(500).json({message: "server error"})
    })
})

router.delete('/:id', (req, res) => {
  projectDb.remove(req.params.id)
    .then(project => {
      res.status(200).json({message: `project ${req.params.id} has been deleted`})
    })
    .catch(err => {
      res.status(500).json({message: "server error"})
    })
})

module.exports = router;