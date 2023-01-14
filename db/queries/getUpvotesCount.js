const db = require('../connection');

/**
 * count all upvotes for a single contirbution.
 * @param {string} contribution_id The id of the contirbution.
 * @return {Promise<[{}]>} A promise to the contributions.
 */
 const getUpvotesCount = function(contribution_id) {
  return db.query(`SELECT id, upvote_users, array_length(upvote_users, 1) as upvote_count
            WHERE id = $1
            FROM contributions;`, [contribution_id])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { getUpvotesCount };
