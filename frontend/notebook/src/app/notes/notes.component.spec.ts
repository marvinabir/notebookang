import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { NotesService } from '../services/notes.service';
import { of, throwError } from 'rxjs';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;
  let notesService: jasmine.SpyObj<NotesService>;

  beforeEach(async () => {
    
    const notesServiceSpy = jasmine.createSpyObj('NotesService', ['getNotes', 'addNote', 'deleteNote']);

    await TestBed.configureTestingModule({
      declarations: [ NotesComponent ],
      imports: [ CommonModule, ReactiveFormsModule, HttpClientModule ],
      providers: [
        FormBuilder,
        { provide: NotesService, useValue: notesServiceSpy }
      ]
    })
    .compileComponents();

    
    notesService = TestBed.inject(NotesService) as jasmine.SpyObj<NotesService>;
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch notes successfully', () => {
    const mockNotes = [{ id: 1, title: 'Note 1', content: 'Content 1' }];
    notesService.getNotes.and.returnValue(of(mockNotes));

    component.getNotes();

    expect(component.notes).equal(mockNotes);
  });

  it('should handle error while fetching notes', () => {
    const errorMessage = 'Failed to fetch notes';
    notesService.getNotes.and.returnValue(throwError(errorMessage));

    spyOn(console, 'error'); 

    component.getNotes();

    expect(console.error).toHaveBeenCalledWith('Error fetching notes:', errorMessage);
  });

  it('should add a new note successfully', () => {
    const newNote = { title: 'New Note', content: 'New Content' };
    notesService.addNote.and.returnValue(of(null));

    component.notesForm.setValue(newNote);
    component.addNote();

    expect(notesService.addNote).toHaveBeenCalledWith(newNote);
    
  });

  it('should handle error while adding a new note', () => {
    const newNote = { title: 'New Note', content: 'New Content' };
    const errorMessage = 'Failed to add note';
    notesService.addNote.and.returnValue(throwError(errorMessage));

    spyOn(console, 'error'); 

    component.notesForm.setValue(newNote);
    component.addNote();

    expect(console.error).toHaveBeenCalledWith('Error creating notes:', errorMessage);
  });

  it('should delete a note successfully', () => {
    const noteId = 1;
    notesService.deleteNote.and.returnValue(of(null));

    component.deleteNote(noteId);

    expect(notesService.deleteNote).toHaveBeenCalledWith(noteId);
    // Optionally, test that getNotes() was called after deleting a note
  });

  it('should handle error while deleting a note', () => {
    const noteId = 1;
    const errorMessage = 'Failed to delete note';
    notesService.deleteNote.and.returnValue(throwError(errorMessage));

    spyOn(console, 'error'); // Spy on console.error

    component.deleteNote(noteId);

    expect(console.error).toHaveBeenCalledWith('Error deleting notes:', errorMessage);
  });
});
