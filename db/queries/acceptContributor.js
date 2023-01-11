const db = require('../connection');

/// contributions

/**
 * Get all contributions for a single story.
 * @param {string} story_id The id of the story.
 * @return {Promise<[{}]>} A promise to the contributions.
 */
 const acceptContributor = function(contributorId, story_id) {
  return db.query(`UPDATE stories
                   SET tellers = array_append(tellers, (
                    SELECT name
                    FROM users
                    WHERE id = $1
                    ))
                   WHERE id = $2;`, [contributorId, story_id])
    .then(
      console.log(`Story ${story_id} has received tales from ${contributorId}`)
      )
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { acceptContributor };
