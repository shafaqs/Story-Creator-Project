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

//acceptContribution/:id
router.post('/:id', (req, res) => {

  getContributionById.getContributionById(req.params.id)
  .then(content => {
    console.log("content in post: ", content)
    acceptContribution.acceptContribution(content, 1) //NOTE: Need a way to get story_id
    .then(
      res.redirect(req.get('referer'))) //Redirects to current page
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
      })

    });

});

module.exports = router;


