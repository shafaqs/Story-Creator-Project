const db = require('../connection');

/// stories

/**
 * Get all stories.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the stories.
 */

 const getYourStories = function(user_id, limit = 10) {
  return db.query(`SELECT stories.id as id, name, title, content, is_completed
                   FROM stories
                   JOIN users ON users.id = creator_id
                   WHERE creator_id = $1
                   ORDER BY title
                   LIMIT $2;`, [user_id, limit])
                   .then((result) => {
                   return result.rows;
                   })
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { getYourStories };
