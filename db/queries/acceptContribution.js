const db = require('../connection');

/// contributions

/**
 * Get all contributions for a single story.
 * @param {string} story_id The id of the story.
 * @return {Promise<[{}]>} A promise to the contributions.
 */
 const acceptContribution = function(contribution, story_id) {
  return db.query(`UPDATE stories
                   SET tales = array_append(tales, $1)
                   WHERE id = $2;`, [contribution, story_id])
    .then(
      console.log(`Story ${story_id} has received addition of ${contribution}`)
      )
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { acceptContribution };
