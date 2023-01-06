/*
 * All routes for Stories Data are defined here
 * Since this file is loaded in server.js into /stories,
 *   these routes are mounted onto /stories
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router  = express.Router();
const contributionsRoutes = require('../db/queries/getAllContributions');


// stories page

router.get('/', (req, res) => {
  // const storyId = req.session.storyId;
  // if (!storyId) {
  //   res.error("💩");
  //   return;
  // }
  const storyId = 1;
  contributionsRoutes.getAllContributions(storyId)
    .then(contributions => {
      console.log(contributions);
      res.json({ contributions });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;


