/*
 * All routes for Stories Data are defined here
 * Since this file is loaded in server.js into /stories,
 *   these routes are mounted onto /stories
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router = express.Router();
const singleStoryQueries = require('../db/queries/getSingleStory');


// stories page

router.get('/:id', (req, res) => {
  singleStoryQueries.getSingleStory(req.params.id)
    .then(story => {
      res.render('popupStory', { story: story });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;


