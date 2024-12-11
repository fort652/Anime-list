// pages/api/list/route.js

import connectMongoDB from "@/libs/mongodb";
import Anime from "@/models/Anime";

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                await connectMongoDB();
                const animeList = await Anime.find();
                res.status(200).json({ animeList });
            } catch (error) {
                console.error("Error fetching animeList:", error);
                res.status(500).json({ error: "Failed to fetch animeList" });
            }
            break;
        case 'POST':
            try {
                const { title, rating, image, description, link } = req.body;
                await connectMongoDB();
                await Anime.create({ title, rating, image, description, link });
                res.status(201).json({ message: "Anime List Created" });
            } catch (error) {
                console.error("Error creating Anime:", error.message, error.stack);
                res.status(500).json({ error: "Failed to create Anime" });
            }
            break;
        case 'DELETE':
            try {
                const id = req.query.id;
                await connectMongoDB();
                await Anime.findByIdAndDelete(id);
                res.status(200).json({ message: "Anime deleted" });
            } catch (error) {
                console.error("Error deleting Anime:", error);
                res.status(500).json({ error: "Failed to delete Anime" });
            }
            break;
        default:
            res.status(405).json({ error: "Method Not Allowed" });
            break;
    }
}
