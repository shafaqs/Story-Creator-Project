/*
 * All routes for Stories Data are defined here
 * Since this file is loaded in server.js into /stories,
 *   these routes are mounted onto /stories
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router  = express.Router();
const upvoteContribution = require('../db/queries/upvoteContribution');
const getStoryId = require('../db/queries/getStoryId');

// stories page

router.post('/:id', (req, res) => {

  const contributionId = req.params.id;
  const userId = req.cookies.user_id;
  console.log(contributionId);

  upvoteContribution.upvoteContribution(contributionId, userId)
  .then(getStoryId.getStoryId(contributionId)
    .then(storyId => {
      res.redirect(`/api/story/${storyId[0].story_id}`);
    })
  )
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });

});

module.exports = router;


