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
const acceptContributor = require('../db/queries/acceptContributor');

//acceptContribution/:id
router.post('/:id', (req, res) => {

  const contributionId = req.params.id;
  const userID = req.cookies.user_id;

  getContributionById.getContributionById(contributionId)
    .then(contributionObject => {
      console.log("content in post: ", contributionObject);
      const content = contributionObject[0].content;
      const contributorId = contributionObject[0].owner_id;
      getStoryId.getStoryId(contributionId)
        .then(storyObject => {
          const storyId = storyObject[0].story_id;
          acceptContribution.acceptContribution(content, storyId)
            .then(acceptContributor.acceptContributor(contributorId, storyId)
              .then(inactivateContribution.inactivateContribution(storyId)
                .then(res.redirect(`/api/stories/user/${userID}`))
              )
            )
        })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});

module.exports = router;

