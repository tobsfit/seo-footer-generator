/// <reference types="cypress" />
describe('Visit Tool', () => {
  beforeEach(()=> {
    cy.visit('/');
  });
  
  it('load the data in editor.js', () => {    
    cy.get('#editorjs').should('exist');
    cy.get('.ce-header').should('contain', 'You can write your content here. Shortcut headline:');
  })
  
  it('user can modify editor.js headline', () => {
    const sampleData = 'The quick, brown fox jumps over a lazy dog.';
    cy.visit('/')
    cy.get('#editorjs').should('exist')
    cy.get('.ce-header').should('contain', 'You can write your content here. Shortcut headline')
    cy.get('.codex-editor__redactor .ce-block:first-child .ce-header').type(sampleData).should('contain', sampleData)
  })
})