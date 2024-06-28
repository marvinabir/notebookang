import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NotesService } from './notes.service';

describe('NotesService', () => {
  let service: NotesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotesService]
    });
    service = TestBed.inject(NotesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all notes', () => {
    const dummyNotes = [
      { id: 1, title: 'Note 1', content: 'Content 1' },
      { id: 2, title: 'Note 2', content: 'Content 2' }
    ];

    service.getNotes().subscribe(notes => {
      expect(notes.length).toBe(2);
      expect(notes).equal(dummyNotes);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyNotes);
  });

  it('should add a new note', () => {
    const newNote = { title: 'New Note', content: 'New Content' };

    service.addNote(newNote).subscribe(note => {
      expect(note).equal(newNote);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).equal(newNote);
    req.flush(newNote);
  });

//   it('should update an existing note', () => {
//     const updatedNote = { id: 1, title: 'Updated Note', content: 'Updated Content' };

//     service.updateNote(updatedNote).subscribe(note => {
//       expect(note).toEqual(updatedNote);
//     });

//     const req = httpMock.expectOne(`${service['apiUrl']}/${updatedNote.id}`);
//     expect(req.request.method).toBe('PUT');
//     expect(req.request.body).toEqual(updatedNote);
//     req.flush(updatedNote);
//   });

  it('should delete a note', () => {
    const id = 1;

    service.deleteNote(id).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
