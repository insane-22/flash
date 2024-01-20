import { RequestHandler } from "express";
import NoteModel from "../models/noteSchema";
import mongoose from "mongoose";

export const getNotesController: RequestHandler = async (req, res) => {
  try {
    const notes = await NoteModel.find({}).limit(12).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All Notes",
      notes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting all notes",
    });
  }
};

export const getSingleNoteController: RequestHandler = async (
  req,
  res,
) => {
  const id = req.params.id;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(500).send({
        error: "Incorrect ID",
      });
    }

    const note = await NoteModel.findById(id);
    if (!note || note === null) {
      return res.status(404).send({
        error: "ID not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Your required note",
      note,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single note",
      error,
    });
  }
};

interface CreateNoteBody {
  title: string;
  text?: string;
}

export const createNoteController: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res) => {
  const { title, text } = req.body;
  try {
    if (!title) {
      return res.status(500).send({
        error: "Title is required",
      });
    }

    const note = await new NoteModel({ title, text }).save();
    res.status(201).send({
      success: true,
      message: "New note created",
      note,
    });
  } catch (error) {
    return res.status(500).send({
      error: "Error in creating note",
    });
  }
};

interface UpdateNoteParams {
  id: string;
}

interface UpdateNoteBody {
  title?: string;
  text?: string;
}

export const updateNoteController: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res) => {
  const id = req.params.id;
  const newTitle = req.body.title;
  // const newText = req.body.text;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(500).send({
        error: "ID is incorrect",
      });
    }

    if (!newTitle) {
      return res.status(400).send({
        error: "Title is required",
      });
    }

    const note = await NoteModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!note) {
      return res.status(400).send({
        error: "Note not found",
      });
    }
    await note.save();
    res.status(201).send({
      success: true,
      message: "Note updated",
      note,
    });
  } catch (error) {
    return res.status(500).send({
      error: "Not able to update note",
    });
  }
};

export const deleteNoteController: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({
        error: "Invalid ID",
      });
    }
    await NoteModel.findByIdAndDelete(id);
    res.status(201).send({
      success: true,
      message: "Note deleted",
    });
  } catch (error) {
    return res.status(500).send({
      error: "Error in deleting note",
    });
  }
};
