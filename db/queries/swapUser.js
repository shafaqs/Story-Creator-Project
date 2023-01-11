const db = require('../connection');

/// contributions

/**
 * Get all contributions for a single story.
 * @param {string} story_id The id of the story.
 * @return {Promise<[{}]>} A promise to the contributions.
 */
 const swapUser = function(newUserId) {
  return db.query(`SELECT *
                   FROM users
                   WHERE id = newUserId;`, [newUserId])
    .then(
      console.log("user swaped.")
      )
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { swapUser };
