import mongoose from "mongoose";
const { Schema } = mongoose;

const submissionsSchema = new Schema({
  travail: {
    type: Schema.Types.ObjectId,
    ref: "TravailAR",
    required: true,
  },
  submissionDate: { type: Date, required: true },
  student: { type: Schema.Types.ObjectId, ref: "User", required: true },
  ressources: [{ type: Schema.Types.ObjectId, ref: "Ressources" }],
});

const Submissions =
  mongoose.models.Submissions ||
  mongoose.model("Submissions", submissionsSchema);

module.exports = Submissions;
