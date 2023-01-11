const db = require('../connection');

/// stories

/**
 * Get all stories.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the stories.
 */

 const getAllStories = function(limit = 9) {
  return db.query(`SELECT stories.id as id, name, title, content, is_completed
                   FROM stories
                   JOIN users ON users.id = creator_id
                   ORDER BY update DESC
                   LIMIT $1;`, [limit])
                   .then((result) => {
                   return result.rows;
                   })
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { getAllStories };
