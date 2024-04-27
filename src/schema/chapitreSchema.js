import mongoose from 'mongoose';
const { Schema } = mongoose;
const Ressources = require('./ressourcesSchema');

const chapitreSchema = new Schema({
    courseId:{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    num: Number,
    title: String,
    description: String,
    elements: [String],
    ressources:[{ type: Schema.Types.ObjectId, ref: 'Ressources' }]
});

const Chapitre = mongoose.models.Chapitre || mongoose.model('Chapitre', chapitreSchema);

module.exports = Chapitre;