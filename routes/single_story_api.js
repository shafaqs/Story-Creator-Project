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
const getUserId = require('../db/queries/getUserId');

// stories page

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const userID = req.cookies.user_id;

  getUserId.getUserId(userID)
    .then(userName => {
      singleStoryQueries.getSingleStory(id)
      .then(stories => {
        if (stories[0].is_completed == true) {
            // just render the story data
            res.render("completed_single_story_api", { story: stories[0], cookies: userID, userName: userName[0].name});
          } else {
            // render the story data and contributions
              contributionsRoutes.getAllContributions(id)
              .then(contributions => {
                res.render("ongoing_single_story_api", { story: stories[0], contributions: contributions, cookies: req.cookies.user_id, userName: userName[0].name});
              });
        }
      })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;


