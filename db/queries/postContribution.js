const db = require('../connection');

/// contributions

/**
 * Get all contributions for a single story.
 * @param {string} story_id The id of the story.
 * @return {Promise<[{}]>} A promise to the contributions.
 */
 const postContribution = function(owner_id, story_id, content) {
  return db.query(`INSERT INTO contributions (owner_id, story_id, content)
                   VALUES ($1, $2, $3);`, [owner_id, story_id, content])
    .then(
      console.log("contribution inserted")
      )
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { postContribution };
