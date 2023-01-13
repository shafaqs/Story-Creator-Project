/*
 * All routes for Stories Data are defined here
 * Since this file is loaded in server.js into /stories,
 *   these routes are mounted onto /stories
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router  = express.Router();
const swapUser = require('../db/queries/swapUser');

// stories page

router.get('/', (req, res) => {

  const getUserId = require('../db/queries/getUserId');
  const userID = req.cookies.user_id;

  getUserId.getUserId(userID)
   .then(userName => {
    res.render('swap_user', { cookies: userID, userName: userName[0].name})
   })

});

router.post('/', (req, res) => {

  if (!req.body.userId) {
    res.status(400).json({ error: 'invalid request: no data in POST body'});
    return;
  }

  const newUserId = req.body.userId;

  swapUser.swapUser(newUserId)
  .then(res.redirect(`/login/${newUserId}`))
  .catch(err => {
    res
      .status(500)
      .json({ error: 'user does not exist.' });
  });

});

module.exports = router;


