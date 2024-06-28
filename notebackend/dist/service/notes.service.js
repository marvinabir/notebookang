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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNote = exports.editNote = exports.createNote = exports.getAllNotes = void 0;
const mssql_1 = __importDefault(require("mssql"));
const config_1 = require("../database/config");
const poolPromise = new mssql_1.default.ConnectionPool(config_1.config)
    .connect()
    .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
})
    .catch(err => {
    console.log('Database Connection Failed! Bad Config: ', err);
    throw err; // re-throw error to ensure poolPromise is never undefined
});
const getAllNotes = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield poolPromise;
    const result = yield pool.request().query('SELECT * FROM Notes');
    return result.recordset;
});
exports.getAllNotes = getAllNotes;
const createNote = (note) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield poolPromise;
    yield pool.request()
        .input('Title', mssql_1.default.VarChar, note.title)
        .input('Content', mssql_1.default.Text, note.content)
        .query('INSERT INTO Notes (Title, Content) VALUES (@Title, @Content)');
});
exports.createNote = createNote;
const editNote = (id, note) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield poolPromise;
    yield pool.request()
        .input('Id', mssql_1.default.Int, id)
        .input('Title', mssql_1.default.VarChar, note.title)
        .input('Content', mssql_1.default.Text, note.content)
        .query('UPDATE Notes SET Title = @Title, Content = @Content WHERE Id = @Id');
});
exports.editNote = editNote;
const removeNote = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield poolPromise;
    yield pool.request()
        .input('Id', mssql_1.default.Int, id)
        .query('DELETE FROM Notes WHERE Id = @Id');
});
exports.removeNote = removeNote;
