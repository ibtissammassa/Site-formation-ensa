import mongoose from 'mongoose';
const { Schema } = mongoose;

const ressourcesSchema = new Schema({
    title:String,
    url:String,
});

const Ressources = mongoose.models.Ressources || mongoose.model('Ressources', ressourcesSchema);

module.exports = Ressources;