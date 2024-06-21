import { Request, Response } from 'express';
import { getAllNotes, createNote, editNote, removeNote } from '../service/notes.service'

export const getNotes = async (req: Request, res: Response) => {
  const notes = await getAllNotes();
  res.json(notes);
};

export const addNote = async (req: Request, res: Response) => {
  const note = req.body;
  await createNote(note);
  res.sendStatus(201);
};

export const updateNote = async (req: Request, res: Response) => {
  const id = req.params.id;
  const note = req.body;
  await editNote(id, note);
  res.sendStatus(200);
};

export const deleteNote = async (req: Request, res: Response) => {
  const id = req.params.id;
  await removeNote(id);
  res.sendStatus(200);
};
