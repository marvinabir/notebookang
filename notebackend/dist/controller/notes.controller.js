"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.addNote = exports.getNotes = void 0;
const notes_service_1 = require("../service/notes.service");
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield (0, notes_service_1.getAllNotes)();
    res.json(notes);
});
exports.getNotes = getNotes;
const addNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const note = req.body;
    yield (0, notes_service_1.createNote)(note);
    res.sendStatus(201);
});
exports.addNote = addNote;
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const note = req.body;
    yield (0, notes_service_1.editNote)(id, note);
    res.sendStatus(200);
});
exports.updateNote = updateNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield (0, notes_service_1.removeNote)(id);
    res.sendStatus(200);
});
exports.deleteNote = deleteNote;
