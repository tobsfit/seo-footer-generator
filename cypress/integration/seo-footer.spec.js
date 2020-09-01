/// <reference types="cypress" />

const seoFaqs = {
  length: 4
};

describe('Visit Tool', () => {

  beforeEach(() => {
    cy.visit('localhost:5000');
    cy.get('#editorjs').should('exist');
    cy.get('.ce-header').should('contain', 'You can write your content here. Shortcut headline:');
  });
  
  it('User can modify editor.js headline', () => {
    const sampleData = 'The quick, brown fox jumps over a lazy dog.';
    cy.visit('/')
    cy.get('#editorjs').should('exist')
    cy.get('.ce-header').should('contain', 'You can write your content here. Shortcut headline')
    cy.get('.codex-editor__redactor .ce-block:first-child .ce-header').type(sampleData).should('contain', sampleData)
  });

  describe('SEO Questions', () => {
    beforeEach(() => {
       // should not be visible
       cy.get('#seo-faqs').should('not.be.visible');
       cy.get('#seo-faqs').should('have.class', 'hide');
       // should be visible
       cy.get('#seo-faqs').invoke('removeClass', 'hide');
       cy.get('#seo-faqs').should('be.visible');
    });

    it('Click on Seo Questions', () => {
      // should contain items
      cy.get('.seo-faq').should('have.length', seoFaqs.length);
    });
    
    it('Remove Seo Question', () => {
      // should contain items
      cy.get('.seo-faq').eq(0).children('.seo-faq__remove').click();
      cy.get('.seo-faq').should('have.length.lte', seoFaqs.length);
    });

    it('Add Seo Question', () => {
      // should contain items
      cy.get('#seo-faqs__more').click();
      cy.get('.seo-faq').should('have.length.gte', seoFaqs.length);
    });
  });
  

  it.only('Copy to clipboard', () => {
    cy.get('#copy-content-clipboard').click();
    cy.contains('Surfooter Code was copied.');
    const block = cy.get('.ce-block').eq(1).its('text')
    cy.get('#output').contains(block)
  });

});