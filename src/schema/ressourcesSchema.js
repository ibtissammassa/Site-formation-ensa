import mongoose from "mongoose";
const { Schema } = mongoose;

const ressourcesSchema = new Schema({
  title: { type: String, required: true },
  url: String,
});

const Ressources =
  mongoose.models.Ressources || mongoose.model("Ressources", ressourcesSchema);

module.exports = Ressources;
