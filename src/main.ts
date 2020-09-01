/* eslint-disable require-jsdoc */
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import LinkTool from '@editorjs/link';
import Embed from '@editorjs/embed';
import Checklist from '@editorjs/checklist';
import Quote from '@editorjs/quote';
import Warning from '@editorjs/warning';
import Marker from '@editorjs/marker';
import CodeTool from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import Table from '@editorjs/table';
import Paragraph from '@editorjs/paragraph';

import ImageUrl from './plugins/image-url/image-url';
import SeoFaq from './plugins/seo-faq/seo-faqs'
import copyToClipboard from './plugins/copy-clipboard/copy-clipboard';
import renderHtml from './plugins/render-html/render-html';
import download from './plugins/download/download';
import showAlert from './plugins/alert/alert';
import eventRemoveButtonsSeo from './plugins/seo-remove-event/seo-remove-event';
import fillDataFromFile from './plugins/data-handling/data-handling';

import { FileHandler } from './plugins/Filehandler/Filehandler';

import pageContent from '../cypress/fixtures/data-complex-4';

let editor: any = {};

const prefill = (pageContent: any, type: string) => {
  editor = new EditorJS({
    holder: 'editorjs',
    tools: {
      header: {
        class: Header,
        inlineToolbar: ['link'],
        config: {
          placeholder: 'Header',
          levels: [2, 3],
        },
        shortcut: 'CMD+SHIFT+H'
      },
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
      },
      image: {
        class: ImageUrl,
        inlineToolbar: true,
        config: {
          placeholder: 'Paste image URL',
        }
      },
      list: {
        class: List,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+L'
      },
      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },
      quote: {
        class: Quote,
        inlineToolbar: true,
        config: {
          quotePlaceholder: 'Enter a quote',
          captionPlaceholder: 'Quote\'s author',
        },
        shortcut: 'CMD+SHIFT+O'
      },
      warning: Warning,
      marker: {
        class: Marker,
        shortcut: 'CMD+SHIFT+M'
      },
      code: {
        class: CodeTool,
        shortcut: 'CMD+SHIFT+C'
      },
      delimiter: Delimiter,
      inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+C'
      },
      linkTool: LinkTool,
      embed: Embed,
      table: {
        class: Table,
        inlineToolbar: true,
        shortcut: 'CMD+ALT+T'
      },
      seofaq: SeoFaq,
    },
    data: fillDataFromFile(pageContent, type),
    logLevel: 'ERROR',
  });
  // prefill seo form data
  const seoFaqForm = document.querySelector('#seo-faqs');
  if (!(pageContent as any).blocks) return;
  const seoCollection = (pageContent as any).blocks.filter((question: any) => question.type === 'seofaq');
  if (seoFaqForm && seoCollection.length > 0) {
    const editorSeoData = seoCollection[0].data.content;
    const seoData = JSON.parse(editorSeoData);
    const seoQuestions = seoData.mainEntity;
    // Reset SEO FAQ form
    seoFaqForm.innerHTML = '';
    seoQuestions.forEach((question: any) => {
      const questionCode = `
      <!-- question -->
      <div class="seo-faq">
        <textarea class="seo-faq__question">${question.name}</textarea>
        <textarea class="seo-faq__answer" name="seo-faq__q1">${question.acceptedAnswer.text}</textarea>
        <button type="button" class="seo-faq__remove surfooter-button surfooter-button--saturated">&#128293;</button>
      </div>`;
      seoFaqForm.innerHTML += questionCode;
    });
  }
  eventRemoveButtonsSeo();
}
prefill(pageContent, 'config');


// Save surfooter as json file
const saveAsJsonButton = document.getElementById('save-as-json');
if (saveAsJsonButton) {
  saveAsJsonButton.addEventListener('click', function () {
    editor.save().then((savedData: any) => {
      // Print to console the saved data as json
      console.log(savedData);
      download("surfooter.json", JSON.stringify(savedData));
    });
  });
}

// Copy Code
const copyContentClipboard = document.querySelector('#copy-content-clipboard');
if (copyContentClipboard) {
  copyContentClipboard.addEventListener('click', () => {
    editor.save()
      .then((savedData: any) => {
        const html = renderAndDisplayHtml(savedData);
        copyToClipboard(html);
      })
      .then(() => {
        showAlert('Surfooter Code was copied.');
      })
  });
}

// More SEO FAQs
const moreSeoQuestionsButton = document.querySelector('#seo-faqs__more');
if (moreSeoQuestionsButton) {
  moreSeoQuestionsButton.addEventListener('click', (event) => {
    const addMore: EventTarget = event.target;
    const form: HTMLElement = document.querySelector('#seo-faqs');
    const textforms: NodeList = (form as HTMLFormElement).querySelectorAll('.seo-faq');
    const newQuestionNumber = textforms.length + 1;
    const newQuestion = `
      <!-- question -->
      <div class="seo-faq">
      <textarea class="seo-faq__question">Question ${newQuestionNumber}</textarea>
        <textarea class="seo-faq__answer" name="seo-faq__q${newQuestionNumber}">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</textarea>
        <button type="button" class="seo-faq__remove surfooter-button surfooter-button--saturated">&#128293;</button>
      </div>`;
    (addMore as HTMLElement).insertAdjacentHTML('beforebegin', newQuestion);
    eventRemoveButtonsSeo();
  });
}

// Add file
const configFileButton = document.querySelector('#file--config');
if (configFileButton) {
  configFileButton.addEventListener('change', function () {
    let handleFile = new FileHandler;
    handleFile.file = this;
    handleFile.editor = editor;
    handleFile.prefill = prefill;
    handleFile.uploadJson();
  });
}

// Add file
const contentFileButton = document.querySelector('#file--content');
if (contentFileButton) {
  contentFileButton.addEventListener('change', function () {
    let handleFile = new FileHandler;
    handleFile.file = this;
    handleFile.editor = editor;
    handleFile.prefill = prefill;
    handleFile.uploadJson();
  });
}

// Save as html file
document.querySelector('#save-as-html').addEventListener('click', () => {
  editor.save().then((savedData: any) => {
    const html = renderAndDisplayHtml(savedData);
    download("surfooter-code.html", html);
  });
});

// Render and Save HTML String
const renderAndDisplayHtml = (savedData: string) => {
  const html = renderHtml(savedData);
  const output = document.querySelector('#output');
  output.innerHTML = html;
  return html;
}

// SEO Faqs
const checkSeoFaqStatus = () => {
  const seoFaqInput = document.querySelector('#seo-faqs__state');
  // check of SEO FAQ section is expanded
  if ((seoFaqInput as HTMLInputElement).checked) {
    document.querySelector('#seo-faqs').classList.add('hide')
    seoFaqInput.parentElement.querySelector('#seo-faqs__state__icon').innerHTML = '&#9994;' // closed hand // https://www.w3schools.com/charsets/ref_emoji.asp
  } else {
    document.querySelector('#seo-faqs').classList.remove('hide');
    seoFaqInput.parentElement.querySelector('#seo-faqs__state__icon').innerHTML = '&#9997;'; // writing hand // https://www.w3schools.com/charsets/ref_emoji.asp
  }
}
document.querySelector('#seo-faqs__state').addEventListener('change', (e) => {
  checkSeoFaqStatus();
});
document.addEventListener('DOMContentLoaded', () => {
  checkSeoFaqStatus();
});