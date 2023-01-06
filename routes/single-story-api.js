/*
 * All routes for Stories Data are defined here
 * Since this file is loaded in server.js into /stories,
 *   these routes are mounted onto /stories
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router  = express.Router();
const singleStoryQueries = require('../db/queries/getSingleStory');


// stories page

router.get('/', (req, res) => {
  // const storyId = req.session.storyId;
  // if (!storyId) {
  //   res.error("💩");
  //   return;
  // }
  const storyId = 3;
  singleStoryQueries.getSingleStory(storyId)
    .then(story => {
      console.log(story);
      res.json({ story });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;


