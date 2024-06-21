import sql from 'mssql';
import { config } from '../database/config'
import { Request, Response } from 'express';
import { Note, notes} from '../interface/note';

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

export const getAllNotes = async () => {
  const pool = new sql.ConnectionPool(config)
  const result = await pool.request().query('SELECT * FROM Notes');
  return result.recordset;
};

export const createNote = async (note: any) => {
  const pool = await poolPromise;
  await pool.request()
    .input('Title', sql.VarChar, note.title)
    .input('Content', sql.Text, note.content)
    .query('INSERT INTO Notes (Title, Content) VALUES (@Title, @Content)');
};

export const editNote = async (id: string, note: any) => {
  const pool = await poolPromise;
  await pool.request()
    .input('Id', sql.Int, id)
    .input('Title', sql.VarChar, note.title)
    .input('Content', sql.Text, note.content)
    .query('UPDATE Notes SET Title = @Title, Content = @Content WHERE Id = @Id');
};

export const removeNote = async (id: string) => {
  const pool = await poolPromise;
  await pool.request()
    .input('Id', sql.Int, id)
    .query('DELETE FROM Notes WHERE Id = @Id');
};