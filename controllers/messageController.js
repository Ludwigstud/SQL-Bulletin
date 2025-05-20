import { createMessage, getChannelMessages } from "../models/messageModel.js";
import { isSubscribed } from "../models/subscriptionModel.js";

export const addMessage = async (req, res) => {
	const { content, channel_id, author_id } = req.body;
	try {
		const subscribed = await isSubscribed(author_id, channel_id);
		if (!subscribed) return res.status(403).json({ error: "Not subscribed to channel" });

		const msg = await createMessage(content, channel_id, author_id);
		res.json(msg);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const listChannelMessages = async (req, res) => {
	const channel_id = req.params.id;
	const user_id = req.query.user_id;
	try {
		const subscribed = await isSubscribed(user_id, channel_id);
		if (!subscribed) return res.status(403).json({ error: "Not subscribed to channel" });

		const msgs = await getChannelMessages(channel_id);
		res.json(msgs);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
