import { createChannel } from "../models/channelModel.js";

export const addChannel = async (req, res) => {
	const { name, owner_id } = req.body;
	try {
		const channel = await createChannel(name, owner_id);
		res.json(channel);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};