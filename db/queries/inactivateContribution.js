const db = require('../connection');

/// contributions

/**
 * Get all contributions for a single story.
 * @param {string} story_id The id of the story.
 * @return {Promise<[{}]>} A promise to the contributions.
 */
 const inactivateContribution = function(story_id) {
  return db.query(`UPDATE contributions
                   SET active = FALSE
                   WHERE story_id = $1;`, [story_id])
    .then(
      console.log(`Contributions for ${story_id} has set to be inactive`)
      )
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { inactivateContribution };
