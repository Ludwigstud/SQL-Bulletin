import pool from "../db/db.js";

export const subscribe = async (user_id, channel_id) => {
	const result = await pool.query(
		"INSERT INTO subscriptions (user_id, channel_id) VALUES ($1, $2) RETURNING *",
		[user_id, channel_id],
	);
	return result.rows[0];
};

export const isSubscribed = async (user_id, channel_id) => {
	const sub = await pool.query(
		"SELECT * FROM subscriptions WHERE user_id = $1 AND channel_id = $2",
		[user_id, channel_id],
	);
	return sub.rowCount > 0;
};
