/*
 * All routes for Stories Data are defined here
 * Since this file is loaded in server.js into /stories,
 *   these routes are mounted onto /stories
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router  = express.Router();
const markAsCompleted = require('../db/queries/markAsCompleted');

// stories page

router.post('/:id', (req, res) => {

  const storyId = req.params.id;

  markAsCompleted.markAsCompleted(storyId)
  .then(res.redirect(`/api/story/${storyId}`))
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });

});

module.exports = router;


