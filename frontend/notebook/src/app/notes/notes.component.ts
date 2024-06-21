import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
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
    this.notesService.getNotes().subscribe((data: any) => {
      this.notes = data;
    });
  }

  addNote() {
    const note = this.notesForm.value;
    this.notesService.addNote(note).subscribe(() => {
      this.getNotes();
    });
  }

  updateNote(note: any) {
    this.notesService.updateNote(note).subscribe(() => {
      this.getNotes();
    });
  }

  deleteNote(id: number) {
    this.notesService.deleteNote(id).subscribe(() => {
      this.getNotes();
    });
  }
}
