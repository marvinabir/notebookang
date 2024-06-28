import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notesForm: FormGroup;
  notes: any[] = [];

  constructor(private fb: FormBuilder, private notesService: NotesService) {
    this.notesForm = this.fb.group({
      title: [''],
      content: ['']
    });
  }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.notesService.getNotes().subscribe(
      (data: any) => {
        this.notes = data;
      },
      (error) => {
        console.error('Error fetching notes:', error);
      }
    );
  }

  addNote() {
    const note = this.notesForm.value;
    this.notesService.addNote(note).subscribe(
      () => {
        this.getNotes(); // Refresh notes list after adding
      },
      (error) => {
        console.error('Error creating note:', error);
      }
    );
  }

  deleteNote(id: number) {
    this.notesService.deleteNote(id).subscribe(
      () => {
        this.getNotes(); // Refresh notes list after deletion
      },
      (error) => {
        console.error('Error deleting note:', error);
      }
    );
  }
}
