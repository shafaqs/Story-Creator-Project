/*
 * All routes for Stories Data are defined here
 * Since this file is loaded in server.js into /stories,
 *   these routes are mounted onto /stories
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router  = express.Router();
const acceptContribution = require('../db/queries/acceptContribution');
const getContributionById = require('../db/queries/getContributionById');
const getStoryId = require('../db/queries/getStoryId');
const inactivateContribution = require('../db/queries/inactivateContribution');

//acceptContribution/:id
router.post('/:id', (req, res) => {

  const contributionId = req.params.id;

  getContributionById.getContributionById(contributionId)
    .then(content => {
      console.log("content in post: ", content);
      getStoryId.getStoryId(contributionId)
        .then(storyObject => {
          const storyId = storyObject[0].story_id;
          acceptContribution.acceptContribution(content, storyId)
            .then(inactivateContribution.inactivateContribution(storyId)
              .then(res.redirect(`/api/story/${storyObject[0].story_id}`))
              )//Redirects to current page
        })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});

module.exports = router;


