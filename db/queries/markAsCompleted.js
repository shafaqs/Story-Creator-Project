const db = require('../connection');

/// contributions

/**
 * Get all contributions for a single story.
 * @param {string} story_id The id of the story.
 * @return {Promise<[{}]>} A promise to the contributions.
 */
 const markAsCompleted = function(story_id) {
  return db.query(`UPDATE stories
                   SET is_completed = TRUE
                   WHERE id = $1;`, [story_id])
    .then(
      console.log(`Mark story # ${story_id} as completed.`)
      )
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { markAsCompleted };
