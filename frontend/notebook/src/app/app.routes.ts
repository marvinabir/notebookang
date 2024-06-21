import { Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';

export const appRoutes: Routes = [
  { path: '', component: NotesComponent },
  { path: '**', redirectTo: '' }
];
