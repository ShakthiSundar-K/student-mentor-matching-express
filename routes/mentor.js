import express from "express";
import Mentor from "../models/Mentor.js";
import Student from "../models/Student.js";

const router = express.Router();

// Create a new mentor
router.post("/", async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).json(mentor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all students assigned to a particular mentor
router.get("/:mentorId/students", async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId).populate(
      "students"
    );
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    res.json(mentor.students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Assign multiple students to a mentor
router.post("/:mentorId/assign-students", async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId);
    const { studentIds } = req.body;

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    // Validate that studentIds is an array
    if (!Array.isArray(studentIds)) {
      return res.status(400).json({ message: "studentIds must be an array" });
    }

    // Proceed with assigning students
    for (const studentId of studentIds) {
      const student = await Student.findById(studentId);
      if (student && !student.mentor) {
        student.mentor = mentor._id;
        await student.save();
        mentor.students.push(student._id);
      }
    }

    await mentor.save();
    res.json({ message: "Students assigned successfully", mentor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
