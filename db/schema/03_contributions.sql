-- Drop and recreate contributions table
DROP TABLE IF EXISTS contributions CASCADE;

CREATE TABLE contributions (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,

  content TEXT,
  is_accepted BOOLEAN NOT NULL DEFAULT FALSE,
  upvote_users TEXT [],
  active BOOLEAN NOT NULL DEFAULT TRUE
);
