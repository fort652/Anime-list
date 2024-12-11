// src/models/Anime.js

import mongoose from "mongoose";

const AnimeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    rating: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

let Anime;

try {
  Anime = mongoose.model('Anime');
} catch {
  Anime = mongoose.model('Anime', AnimeSchema);
}

export default Anime;
