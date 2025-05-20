import { subscribe } from "../models/subscriptionModel.js";

export const subscribeToChannel = async (req, res) => {
	const { user_id, channel_id } = req.body;
	try {
		const sub = await subscribe(user_id, channel_id);
		res.json(sub);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
