const db = require('../connection');

/// stories

/**
 * Get all stories.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the stories.
 */

 const getUserId = function(user_id) {
  return db.query(`SELECT name
                   FROM users
                   WHERE id = $1;`, [user_id])
                   .then((result) => {
                   return result.rows;
                   })
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { getUserId };
