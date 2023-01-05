SELECT stories.id as id, contributions.content as content, array_length(upvote_users, 1) as upvote_count
FROM stories
JOIN contributions ON stories.id = story_id
WHERE stories.id = 3
ORDER BY array_length(upvote_users, 1) DESC
LIMIT 10;
