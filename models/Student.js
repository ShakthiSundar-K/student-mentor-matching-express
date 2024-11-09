import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
  previousMentors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mentor" }],
});

export default mongoose.model("Student", studentSchema);
