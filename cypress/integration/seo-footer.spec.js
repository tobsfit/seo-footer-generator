/// <reference types="cypress" />

const seoFaqs = {
  length: 4
};

describe('Visit Tool', () => {
  beforeEach(() => {
    cy.visit('localhost:5000');
  });

  describe('Edit editor.js content', () => {
    const sampleData = 'The quick, brown fox jumps over a lazy dog.';
    
    it('User can modify editor.js headline', () => {
      cy.get('#editorjs').should('exist')
      cy.get('.ce-header').should('contain', 'You can write your content here. Shortcut headline')
      cy.get('.codex-editor__redactor .ce-block:first-child .ce-header').type(sampleData).should('contain', sampleData)
    });
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
  
  describe('Finish seofooter', () => {
    let heading;
    let paragraph;
    
    beforeEach(()=> {  
      // get first heading
      cy.get('.ce-header').first().then(($btn) => {
        heading = $btn.text();
      });
      cy.get('.ce-paragraph').first().then(($btn) => {
        paragraph = $btn.text();
      });
    });

    it('Click Save configuration file button', () => {
      // check local storage
      cy.get('#save-as-json').click().should(() => {
        cy.log(heading);
        cy.log(paragraph);
        expect(localStorage.getItem('structured')).to.contain(heading);
      });
    });

    it('Click save as html button', () => {
      // check local storage
      cy.get('#save-as-html').click().should(() => {
        cy.log(heading);
        cy.log(paragraph);
        expect(localStorage.getItem('html')).to.contain(heading);
        expect(localStorage.getItem('html')).to.contain(paragraph);
      });
    });
    
    it('Save as html button', () => {
      // check local storage
      cy.get('#save-as-html').click().should(() => {
        cy.log(heading);
        cy.log(paragraph);
        expect(localStorage.getItem('html')).to.contain(heading);
        expect(localStorage.getItem('html')).to.contain(paragraph);
      });
    });

  });

});