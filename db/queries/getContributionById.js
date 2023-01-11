const db = require('../connection');

/// Get the content of a contribution by its ID

/**
 * @param {string} story_id The id of the story.
 * @return {Promise<[{}]>} A promise to the contributions.
 */
 const getContributionById = function(contribution_id) {
  return db.query(`SELECT content
    FROM contributions
    WHERE id = $1`, [contribution_id])
    .then((result) => {
      return result.rows[0].content;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { getContributionById };
