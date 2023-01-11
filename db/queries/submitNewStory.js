const db = require('../connection');

/// contributions

/**
 * Get all contributions for a single story.
 * @param {string} story_id The id of the story.
 * @return {Promise<[{}]>} A promise to the contributions.
 */
 const submitNewStory = function(creator_id, title, content, update) {
  return db.query(`INSERT INTO stories (creator_id, title, content, update)
                   VALUES ($1, $2, $3, $4);`, [creator_id, title, content, update])
    .then(
      console.log("story hook created")
      )
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { submitNewStory };
