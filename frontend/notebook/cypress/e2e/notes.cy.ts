
describe('Notes Component', () => {
    beforeEach(() => {
      cy.visit('/'); 
    });
  
    it('should add a new note', () => {
      cy.get('input[formControlName="title"]').type('New Note Title');
      cy.get('textarea[formControlName="content"]').type('New Note Content');
      cy.get('button').contains('Add').click();
  
      cy.get('.note-item').should('have.length.greaterThan', 0);
    });
  
    it('should delete a note', () => {
      
      cy.get('.note-item').first().find('button').contains('Delete').click();
      cy.get('.note-item').should('have.length.lessThan', 1);
    });
  });
  