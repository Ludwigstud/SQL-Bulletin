import pool from "../db/db.js";

export const createUser = async (name, email) => {
	const result = await pool.query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *", [
		name,
		email,
	]);

	return result.rows[0];
};

export const getUserChannels = async (user_id) => {
	const result = await pool.query(
		"SELECT c.* FROM channels c JOIN subscriptions s ON c.id = s.channel_id WHERE s.user_id = $1",
		[user_id],
	);

	return result.rows;
};
