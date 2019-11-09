const express = require('express');

const router = express.Router();
const projectDb = require('../helpers/projectModel')

router.post('/', verifyPost, (req, res) => {
  projectDb.insert(req.body)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "server error"})
    })
})

router.get('/', (req, res) => {
  projectDb.get()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "server error"})
    })
})

router.get('/:id', verifyPostId, (req, res) => {
  projectDb.get(req.params.id)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "server error"})
    })
})

router.put('/:id', verifyPostId, (req, res) => {
  projectDb.update(req.params.id, req.body)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "server error"})
    })
})

router.delete('/:id', verifyPostId, (req, res) => {
  projectDb.remove(req.params.id)
    .then(project => {
      res.status(200).json({message: `project ${req.params.id} has been deleted`})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "server error"})
    })
})

//@@@@@@@@@@@@@@@@ MIDDLEWARE @@@@@@@@@@@@@@@@@@

function verifyPost(req, res, next) {
  if (!req.body.name || !req.body.description) {
    res.status(404).json({message: "you are missing either, or both of: name and description"})
  } else {
    next()
  }
}

function verifyPostId(req, res, next) {
  projectDb.get(req.params.id)
    .then(post => {
      if (post) {
        next();
      } else {
        res.status(404).json({message: `post ${req.params.id} does not exist `})
      }
    })
}

module.exports = router;