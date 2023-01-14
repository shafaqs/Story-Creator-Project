const db = require('../connection');

/// contributions

/**
 * Get all contributions for a single story.
 * @param {string} contributionId The id of the contribution.
 * @return {Promise<[{}]>} A promise to the contributions.
 */
 const upvoteContribution = function(contributionId, ownerId) {
  return db.query(`UPDATE contributions
                   SET upvote_users = array_append(upvote_users, $2)
                   WHERE id = $1;`, [contributionId, ownerId])
    .then(
      console.log(`Upvote contribution # ${contributionId}.`)
      )
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { upvoteContribution };
