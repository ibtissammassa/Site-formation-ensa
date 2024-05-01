import mongoose from "mongoose";
const { Schema } = mongoose;
import ressourcesSchema from "./ressourcesSchema";

const travailARSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  module: {
    type: Schema.Types.ObjectId,
    ref: "Module",
  },
  delais: { type: Date, required: true },
  rendu: { type: Number, default: 0, required: true },
  detail: String,
  ressources: [{ type: Schema.Types.ObjectId, ref: "Ressources" }],
});

const TravailAR =
  mongoose.models.TravailAR || mongoose.model("TravailAR", travailARSchema);

module.exports = TravailAR;
