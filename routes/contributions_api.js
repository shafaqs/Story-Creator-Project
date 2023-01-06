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

router.get('/:id', (req, res) => {
  contributionsRoutes.getAllContributions(req.params.id)
    .then(contributions => {
      res.json({ contributions });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;


