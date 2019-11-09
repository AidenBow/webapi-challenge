const express = require('express');

const router = express.Router();
const actionDb = require('../helpers/actionModel')


router.post('/', verifyAction, (req, res) => {
  actionDb.insert(req.body)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "server error"})
    })
})

router.get('/', (req, res) => {
  actionDb.get()
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "server error"})
    })
})

router.get('/:id', verifyActionId, (req, res) => {
  actionDb.get(req.params.id)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "server error"})
    })
})

router.put('/:id', verifyAction, verifyActionId, (req, res) => {
  actionDb.update(req.params.id, req.body)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "server error"})
    })
})

router.delete('/:id', verifyActionId, (req, res) => {
  actionDb.remove(req.params.id)
    .then(action => {
      res.status(200).json({message: `action ${req.params.id} has been deleted`})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "server error"})
    })
})

//@@@@@@@@@@@@@@@@ MIDDLEWARE @@@@@@@@@@@@@@@@@@

function verifyAction(req, res, next) {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(404).json({message: "you are missing one or multiple of: project_id, description, and notes"})
  } else {
    next()
  }
}

function verifyActionId(req, res, next) {
  actionDb.get(req.params.id)
    .then(action => {
      if (action) {
        next();
      } else {
        res.status(404).json({message: `action ${req.params.id} does not exist `})
      }
    })
}


module.exports = router;