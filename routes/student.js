import express from "express";
import Mentor from "../models/Mentor.js";
import Student from "../models/Student.js";

const router = express.Router();

// Create a new student
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Assign or change mentor for a student
router.post("/:studentId/assign-mentor/:mentorId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    const newMentor = await Mentor.findById(req.params.mentorId);

    if (!student || !newMentor) {
      return res.status(404).json({ message: "Student or Mentor not found" });
    }

    // Update previous mentors list
    if (student.mentor && !student.previousMentors.includes(student.mentor)) {
      student.previousMentors.push(student.mentor);
    }

    // Update the mentor relationship
    student.mentor = newMentor._id;
    await student.save();

    // Add student to new mentor's list
    newMentor.students.push(student._id);
    await newMentor.save();

    res.json({ message: "Mentor assigned successfully", student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get the previously assigned mentors of a student
router.get("/:studentId/previous-mentors", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate(
      "previousMentors"
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student.previousMentors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
