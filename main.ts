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

import ImageUrl from './plugins/image-url/image-url';
import SeoFaq from './plugins/seo-faq/seo-faqs'
import copyToClipboard from './plugins/copy-clipboard/copy-clipboard';
import renderHtml from './plugins/render-html/render-html';
import download from './plugins/download/download';
import showAlert from './plugins/alert/alert';

import pageContent from './data/data-complex-4';

let editor: any = {};
const prefillData = (pageContent: object) => {
  editor = new EditorJS({
    holder: 'editorjs',
    tools: {
      header: {
        class: Header,
        inlineToolbar: ['link'],
        config: {
          placeholder: 'Header',
          levels: [3, 4],
        },
        shortcut: 'CMD+SHIFT+H'
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
    data: pageContent,
    logLevel: 'ERROR',
  });
  // prefill form
  const seoFaqForm = document.querySelector('#seo-faqs');
  const seoCollection = (pageContent as any).blocks.filter((question: any) => question.type === 'seofaq');

  if (seoFaqForm && seoCollection.length > 0) {
    const textforms = document.querySelectorAll('.seo-faq');
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
        <button class="seo-faq__remove surfooter-button surfooter-button--saturated">&#128293;</button>
      </div>`;
      seoFaqForm.innerHTML += questionCode;
    });
  }
}
prefillData(pageContent);


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
    editor.save().then((savedData: any) => {
      const html = renderHtml(savedData);
      copyToClipboard(html);
      showAlert('Surfooter Code was copied.');
    });
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
    <button class="seo-faq__remove surfooter-button surfooter-button--saturated">&#128293;</button>
  </div>`;
    (addMore as HTMLElement).insertAdjacentHTML('beforebegin', newQuestion);
  });
}

// Remove single SEO item
const allRemoveButtons = document.querySelectorAll('.seo-faq__remove');
if (allRemoveButtons.length > 0) {
  const removeSeoQuestion = (): void => {
    const currentItem: HTMLElement = (this as any).closest('.seo-faq');
    currentItem.remove();
  }
  // addEventListener
  allRemoveButtons.forEach((removeButton) => {
    removeButton.addEventListener('click', removeSeoQuestion);
  });
}

// Add file
const fileUploadButton = document.querySelector('#file');
if (fileUploadButton) {
  fileUploadButton.addEventListener('change', function () {
    const allFiles: any = this;
    if (allFiles.files.length === 0) {
      console.warn('No file selected.');
      return;
    }
    // create a file reader
    const reader = new FileReader();
    reader.onload = function fileReadCompleted() {
      let result: any = reader.result;
      if (result.length <= 0) return;
      // Destroy editor.js
      editor.destroy();
      // Create new editor.js and prefill data from json
      result = JSON.parse(result);
      prefillData(result);
    };
    reader.readAsText(allFiles.files[0]);
  });
}

// Save as html file
document.querySelector('#save-as-html').addEventListener('click', () => {
  editor.save().then((savedData: any) => {
    const html = renderHtml(savedData);
    download("surfooter-code.html", html);
  });
});

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