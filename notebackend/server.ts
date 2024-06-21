// src/server.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import notesRoutes from './src/route/notes.route'

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/notes', notesRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
