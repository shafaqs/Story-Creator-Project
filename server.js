// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');



const PORT = process.env.PORT || 8080;
const app = express();
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const storiesRoutes = require("./routes/stories-api");
const singleStoryRoutes = require("./routes/single_story_api.js");
const getYourStories = require("./routes/user-stories-api.js");
const postContribution = require("./routes/post_contribution.js");
const markAsCompleted = require("./routes/mark_as_completed.js");
const acceptContribution = require("./routes/accept_contribution.js");
const upvoteContribution = require("./routes/upvote_contribution.js");
const downvoteContribution = require("./routes/downvote_contribution.js");
const submitNewStory = require("./routes/submit_new_story");
const swapUser = require("./routes/swap_user");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use("/", storiesRoutes);
app.use("/api/story", singleStoryRoutes);
app.use('/api/stories/user', getYourStories);
app.use('/contribution', postContribution);
app.use('/markAsCompleted', markAsCompleted);
app.use('/acceptContribution', acceptContribution);
app.use('/upvote', upvoteContribution);
app.use('/downvote', downvoteContribution);
app.use('/submitNewStory', submitNewStory);
app.use('/swapUser', swapUser);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.get('/login/:id', (req, res) => {

  // using plain-text cookies
  res.cookie('user_id', req.params.id);

  // send the user somewhere
  res.redirect('/');
});

app.get('/story/:id', (req, res) => {

  const storyId = req.params.id;
  res.redirect(`/api/story/${storyId}`);
  // send the user somewhere
});

app.get('/create-new-story', (req, res) => {

  const getUserId = require('./db/queries/getUserId');
  const userID = req.cookies.user_id;

  getUserId.getUserId(userID)
    .then(userName => {
      res.render('create_new_story', { cookies: userID, userName: userName[0].name});
    })

});
