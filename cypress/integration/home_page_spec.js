describe('The Home Page', () => {
  it('load the data in editor.js', function () {
    cy.visit('/')
    cy.get('#editorjs').should('exist')
    cy.get('.ce-header').should('contain', 'You can write your content here. Shortcut headline: ')
  })
  
  it('user can modify editor.js headline', function () {
    const sampleData = 'The quick, brown fox jumps over a lazy dog.'
    cy.visit('/')
    cy.get('#editorjs').should('exist')
    cy.get('.ce-header').should('contain', 'You can write your content here. Shortcut headline')
    cy.get('.codex-editor__redactor .ce-block:first-child .ce-header').type(sampleData).should('contain', sampleData)
  })
})