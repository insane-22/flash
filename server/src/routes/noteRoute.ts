import express from "express";
import {
  createNoteController,
  deleteNoteController,
  getNotesController,
  getSingleNoteController,
  updateNoteController,
} from "../controller/noteController";

const router = express.Router();

router.get("/", getNotesController);
router.post("/", createNoteController);
router.get("/:id", getSingleNoteController);
router.patch("/:id", updateNoteController);
router.delete("/:id", deleteNoteController);

export default router;
