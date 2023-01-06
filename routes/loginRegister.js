
const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/loginRegister');

// /login/:id
router.get('/:id', (req, res) => {
  res.cookie('user_id', req.params.id);
  console.log("now logged in as user ", req.params.id)
  res.redirect('/')
});

module.exports = router;
