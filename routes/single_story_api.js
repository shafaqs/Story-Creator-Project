/*
 * All routes for Stories Data are defined here
 * Since this file is loaded in server.js into /stories,
 *   these routes are mounted onto /stories
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router  = express.Router();
const singleStoryQueries = require('../db/queries/getSingleStory');
const contributionsRoutes = require('../db/queries/getAllContributions');


// stories page

router.get('/:id', (req, res) => {
  singleStoryQueries.getSingleStory(req.params.id)
    .then(stories => {
      return contributionsRoutes.getAllContributions(req.params.id)
      .then(contribuitons => {
        res.render("single_story_api", { story: stories[0], contributions: contribuitons, cookies: req.cookies.user_id});
      });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;


