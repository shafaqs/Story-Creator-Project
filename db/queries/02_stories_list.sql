SELECT stories.id as id, name, title, content, is_completed
FROM stories
JOIN users ON users.id = creator_id
ORDER BY name
LIMIT 10;
