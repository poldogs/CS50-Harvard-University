
-- 1.sql: List the names of all songs in the database

SELECT name FROM songs;

-- 2.sql: List the names of all songs in increasing order of tempo

SELECT name FROM songs ORDER BY tempo;

-- 3.sql: List the names of the top 5 longest songs, in descending order of length

SELECT name FROM songs ORDER BY duration_ms DESC LIMIT 5;

-- 4.sql: List the names of any songs that have danceability, energy, and valence greater than 0.75

SELECT name FROM songs WHERE danceability > 0.75 AND energy > 0.75 AND valence > 0.75;

-- 5.sql: Return the average energy of all the songs

SELECT AVG(energy) FROM songs;

-- 6.sql: List the names of songs that are by Post Malone

SELECT s.name
FROM songs s
JOIN artists a ON s.artist_id = a.id
WHERE a.name = 'Post Malone';

-- 7.sql: Return the average energy of songs that are by Drake

SELECT AVG(s.energy)
FROM songs s
JOIN artists a ON s.artist_id = a.id
WHERE a.name = 'Drake';

-- 8.sql: List the names of the songs that feature other artists

SELECT name FROM songs WHERE name LIKE '%feat.%';

-- 9.sql: List the average energy, average valence, and average danceability of all the songs

SELECT AVG(energy) AS avg_energy, AVG(valence) AS avg_valence, AVG(danceability) AS avg_danceability
FROM songs;