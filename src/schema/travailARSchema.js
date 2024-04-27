import mongoose from "mongoose";
const {Schema} = mongoose;
import ressourcesSchema from "./ressourcesSchema";

const travailARSchema = new Schema({
    title: String,
    slug: String,
    module: {
        type: Schema.Types.ObjectId,
        ref: 'Module'
    },
    delais: Date,
    rendu: { type: Number, default: 0 },
    detail: String,
    ressources: [ressourcesSchema],
});

const TravailAR = mongoose.models.TravailAR || mongoose.model("TravailAR", travailARSchema);

module.exports = TravailAR;