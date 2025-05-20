import pool from "../db/db.js";

export const createMessage = async (content, channel_id, author_id) => {
	const result = await pool.query(
		"INSERT INTO messages (content, channel_id, author_id) VALUES ($1, $2, $3) RETURNING *",
		[content, channel_id, author_id],
	);
	return result.rows[0];
};

export const getChannelMessages = async (channel_id) => {
	const result = await pool.query(
		"SELECT * FROM messages WHERE channel_id = $1 ORDER BY created_at DESC",
		[channel_id],
	);
	return result.rows;
};
