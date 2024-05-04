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
  profId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  semester: { type: Number, required: true, enum: [1, 2, 3, 4] },
});

const Module = mongoose.models.Module || mongoose.model("Module", moduleSchema);

module.exports = Module;
