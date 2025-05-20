import pool from "../db/db.js";

export const createChannel = async (name, owner_id) => {
	const result = await pool.query(
		"INSERT INTO channels (name, owner_id) VALUES ($1, $2) RETURNING *",
		[name, owner_id],
	);
	return result.rows[0];
};
