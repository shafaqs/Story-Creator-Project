const db = require('../connection');
const Promise = require('promise');

/// stories

/**
 * Get a single story.
 * @param {string} story_id The id of the story.
 * @return {Promise<[{}]>} A promise to the stories.
 */


 const getSingleStory = function(story_id) {
  return db.query(`SELECT stories.id as id, users.id as user_id, name, title, content, tellers, tales, is_completed
                   FROM stories
                   JOIN users ON users.id = creator_id
                   WHERE stories.id = $1;`, [story_id])
                   .then((result) => {
                      return result.rows;
                   })
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { getSingleStory };
