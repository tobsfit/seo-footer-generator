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

import pageContent from './data/data-complex-4';

const saveButton = document.getElementById('save-as-json');

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
}
prefillData(pageContent);

saveButton.addEventListener('click', function () {
  editor.save().then((savedData: any) => {
    console.log(savedData);
    download("surfooter.json", JSON.stringify(savedData));
  });
});

function download(filename: string, text: string) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// Copy Code
document.querySelector('#copy-content-clipboard').addEventListener('click', () => {
  editor.save().then((savedData: any) => {
    const html = renderHtml(savedData);
    copyToClipboard(html);
    showAlert('Surfooter Code was copied.');
  });
});



document.querySelector('#seo-faqs__more').addEventListener('click', (e) => {
  const addMore: EventTarget = e.target;
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

// Remove SEO Item
const allRemoveButtons = document.querySelectorAll('.seo-faq__remove');
allRemoveButtons.forEach((removeButton) => {
  removeButton.addEventListener('click', removeSeoQuestion);
});

function removeSeoQuestion() {
  const currentItem: HTMLElement = this.closest('.seo-faq');
  currentItem.remove();
}

const showAlert = (message: string) => {
  document.querySelector<HTMLElement>('.alert').classList.add('animate');
  document.querySelector<HTMLElement>('.alert').querySelector('p').innerHTML = message;
  setTimeout(() => {
    document.querySelector<HTMLElement>('.alert').classList.remove('animate');
    document.querySelector<HTMLElement>('.alert').querySelector('p').innerHTML = '';
  }, 7000);
};

// Add file
document.getElementById('file').addEventListener('change', function () {
  const allFiles: any = this;
  if (allFiles.files.length === 0) {
    console.warn('No file selected.');
    return;
  }
  const reader = new FileReader();
  reader.onload = function fileReadCompleted() {
    let result: any = reader.result;
    if (result.length <= 0) return;
    // Destroy editor.
    editor.destroy();
    // Create new editor with prefilled data from json file.
    result = JSON.parse(result);
    prefillData(result);
  };
  reader.readAsText(allFiles.files[0]);
});

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