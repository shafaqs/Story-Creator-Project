/*
 * All routes for Stories Data are defined here
 * Since this file is loaded in server.js into /stories,
 *   these routes are mounted onto /stories
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router  = express.Router();
const storiesQueries = require('../db/queries/getYourStories');
const getUserId = require('../db/queries/getUserId');

// stories page

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const userID = req.cookies.user_id;

  getUserId.getUserId(userID)
    .then(userName => {
      storiesQueries.getYourStories(id)
      .then(stories => {
        res.render("stories_api", { stories, cookies: userID, userName: userName[0].name});
      })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;

