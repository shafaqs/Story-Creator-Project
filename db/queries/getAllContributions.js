const db = require('../connection');

/// contributions

/**
 * Get all contributions for a single story.
 * @param {string} story_id The id of the story.
 * @return {Promise<[{}]>} A promise to the contributions.
 */
 const getAllContributions = function(story_id, limit = 10) {
  return db.query(`SELECT stories.id as id, name as contributor_name, contributions.content as content, array_length(upvote_users, 1) as upvote_count
            FROM stories
            JOIN contributions ON stories.id = story_id
            JOIN users ON contributions.owner_id = users.id
            WHERE stories.id = $1
            ORDER BY array_length(upvote_users, 1) DESC
            LIMIT $2;`, [story_id, limit])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { getAllContributions };
