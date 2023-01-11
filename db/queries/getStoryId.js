const db = require('../connection');

/// contributions

/**
 * Get all contributions for a single story.
 * @param {string} story_id The id of the story.
 * @return {Promise<[{}]>} A promise to the contributions.
 */
 const getStoryId = function(contributionId) {
  return db.query(`SELECT story_id
            FROM contributions
            WHERE id = $1;`, [contributionId])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { getStoryId };
