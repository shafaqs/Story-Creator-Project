/*
 * All routes for Stories Data are defined here
 * Since this file is loaded in server.js into /stories,
 *   these routes are mounted onto /stories
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router  = express.Router();
const postContribution = require('../db/queries/postContribution');

// stories page

router.post('/:id', (req, res) => {

  const ownerId = req.cookies.user_id;
  const content = req.body.text;
  const storyId = req.params.id;

  postContribution.postContribution(ownerId, storyId, content)
  .then(res.redirect(`/api/story/${storyId}`))
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });

});

module.exports = router;


