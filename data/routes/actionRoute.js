const express = require('express');

const router = express.Router();
const actionDb = require('../helpers/actionModel')


router.post('/', (req, res) => {
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

router.get('/:id', (req, res) => {
  actionDb.get(req.params.id)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "server error"})
    })
})

router.put('/:id', (req, res) => {
  actionDb.update(req.params.id, req.body)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "server error"})
    })
})

router.delete('/:id', (req, res) => {
  actionDb.remove(req.params.id)
    .then(action => {
      res.status(200).json({message: `action ${req.params.id} has been deleted`})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "server error"})
    })
})



module.exports = router;