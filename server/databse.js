const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

 const getUserWithEmail = (email) => {
  return pool
    .query(`SELECT * FROM users WHERE users.email LIKE $1`, [email])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getUserWithEmail = getUserWithEmail;

/// stories

/**
 * Get all stories.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the stories.
 */

const getAllStories = function(limit = 10) {
  return pool
    .query(`SELECT stories.id as id, name, title, content, is_completed
            FROM stories
            JOIN users ON users.id = creator_id
            ORDER BY name
            LIMIT $1;;`, [limit])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getAllStories = getAllStories;

/**
 * Get a single story.
 * @param {string} story_id The id of the story.
 * @return {Promise<[{}]>} A promise to the stories.
 */
const getSingleStory = function(story_id) {
  return pool
    .query(`SELECT stories.id as id, name, title, content, is_completed
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
exports.getSingleStory = getSingleStory;

/// contributions

/**
 * Get all contributions for a single story.
 * @param {string} story_id The id of the story.
 * @return {Promise<[{}]>} A promise to the contributions.
 */
const getAllContributions = function(story_id, limit = 10) {
  return pool
    .query(`SELECT stories.id as id, contributions.content as content, array_length(upvote_users, 1) as upvote_count
            FROM stories
            JOIN contributions ON stories.id = story_id
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
exports.getAllContributions = getAllContributions;

/**
 * count all upvotes for a single contirbution.
 * @param {string} contribution_id The id of the contirbution.
 * @return {Promise<[{}]>} A promise to the contributions.
 */
 const getUpvotesCount = function(contribution_id) {
  return pool
    .query(`SELECT id, array_length(upvote_users, 1) as upvote_count
            WHERE id = $1
            FROM contributions;`, [contribution_id])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getUpvotesCount = getUpvotesCount;
