
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import notesRoutes from './route/notes.route'

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/notes', notesRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
