import express from 'express';
import cors from 'cors';
import pkg from 'pg';

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
	user: "ludde",
	host: "localhost",
	database: "postgres",
	password: "ludde123",
	port: 5432,
});

// Skapa användare
app.post("/users", async (req, res) => {
	const { name, email } = req.body;
	const result = await pool.query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *", [
		name,
		email,
	]);
	res.json(result.rows[0]);
});

// Skapa kanal
app.post("/channels", async (req, res) => {
	const { name, owner_id } = req.body;
	const result = await pool.query(
		"INSERT INTO channels (name, owner_id) VALUES ($1, $2) RETURNING *",
		[name, owner_id],
	);
	res.json(result.rows[0]);
});

// Prenumerera på kanal
app.post("/subscriptions", async (req, res) => {
	const { user_id, channel_id } = req.body;
	const result = await pool.query(
		"INSERT INTO subscriptions (user_id, channel_id) VALUES ($1, $2) RETURNING *",
		[user_id, channel_id],
	);
	res.json(result.rows[0]);
});

// Skapa meddelande (endast om prenumerant)
app.post("/messages", async (req, res) => {
	const { content, channel_id, author_id } = req.body;
	// Kontrollera prenumeration först
	const sub = await pool.query(
		"SELECT * FROM subscriptions WHERE user_id = $1 AND channel_id = $2",
		[author_id, channel_id],
	);
	if (sub.rowCount === 0) return res.status(403).json({ error: "Not subscribed to channel" });

	const result = await pool.query(
		"INSERT INTO messages (content, channel_id, author_id) VALUES ($1, $2, $3) RETURNING *",
		[content, channel_id, author_id],
	);
	res.json(result.rows[0]);
});

// Hämta meddelanden från kanal (kräver prenumeration)
app.get("/channels/:id/messages", async (req, res) => {
	const channel_id = req.params.id;
	const user_id = req.query.user_id; // Passeras i query
	// Kontrollera prenumeration
	const sub = await pool.query(
		"SELECT * FROM subscriptions WHERE user_id = $1 AND channel_id = $2",
		[user_id, channel_id],
	);
	if (sub.rowCount === 0) return res.status(403).json({ error: "Not subscribed to channel" });

	const result = await pool.query(
		"SELECT * FROM messages WHERE channel_id = $1 ORDER BY created_at DESC",
		[channel_id],
	);
	res.json(result.rows);
});

// Lista kanaler en användare prenumererar på
app.get("/users/:id/channels", async (req, res) => {
	const user_id = req.params.id;
	const result = await pool.query(
		"SELECT c.* FROM channels c JOIN subscriptions s ON c.id = s.channel_id WHERE s.user_id = $1",
		[user_id],
	);
	res.json(result.rows);
});

app.listen(3000, () => console.log("Server running on port 3000"));
