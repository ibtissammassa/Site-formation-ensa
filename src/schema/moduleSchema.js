import mongoose from "mongoose";
const { Schema } = mongoose;
import Chapitre from "@/schema/chapitreSchema";

const moduleSchema = new Schema({
  coverImage: String,
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  progress: Number,
  date_debut: Date,
  date_fin: Date,
  objectif: String,
  volume_horaire: {
    total: Number,
    cours: Number,
    td: Number,
    tp: Number,
  },
  chapitres: [Chapitre.schema],
  //profName and profImage is needed
});

const Module = mongoose.models.Module || mongoose.model("Module", moduleSchema);

module.exports = Module;
