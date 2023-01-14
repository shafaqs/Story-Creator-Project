/*
 * All routes for Stories Data are defined here
 * Since this file is loaded in server.js into /stories,
 *   these routes are mounted onto /stories
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router  = express.Router();
const submitNewStory = require('../db/queries/submitNewStory');

// stories page


router.post('/', (req, res) => {

  if (!req.body.hook || !req.body.title) {
    res.status(400).json({ error: 'invalid request: no data in POST body'});
    return;
  }

  const creator_id = req.cookies.user_id;
  const title = req.body.title;
  const content = req.body.hook;
  const update = new Date().toISOString().slice(0, 19).split("T")[0];

  submitNewStory.submitNewStory(creator_id, title, content, update)
  .then(res.redirect(`/api/stories/user/${creator_id}`))
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });

});

module.exports = router;


