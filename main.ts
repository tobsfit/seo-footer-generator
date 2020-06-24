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

import ImageUrl from './image-url/image-url';

import pageContent from './data/data-complex-4';

import beautifyString from './format-document/beautify-string';

const saveButton = document.getElementById('saveButton');

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
    },
    data: pageContent,
    logLevel: 'ERROR',
  });
}
prefillData(pageContent);

saveButton.addEventListener('click', function () {
  editor.save().then((savedData: any) => {
    // console.log(savedData);
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
    const html = copySurfooterMarkup(savedData);
    copyToClipboard(html);
  });
});

const copySurfooterMarkup = (savedData: any) => {
  const blocks = savedData.blocks;
  console.log(blocks);
  const css = `<style id="surfooter__styles">${document.querySelector('#clipboard__styling').innerHTML}</style>`;
  let html = css;
  html += `<div class="surfooter">`
  for (let block of blocks) {
    let { type, data } = <any>block;
    switch (type) {
      case 'header':
        html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
        break;
      case 'paragraph':
        html += `<p>${block.data.text}</p>`;
        break;
      case 'delimiter':
        html += '<hr />';
        break;
      case 'image':
        html += `<img class="img-fluid" src="${block.data.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
        break;
      case 'list':
        html += '<ul>';
        block.data.items.forEach(function (li: any) {
          html += `<li>${li}</li>`;
        });
        html += '</ul>';
        break;
      case 'checklist':
        html += '<div class="surfooter__checkboxes">';
        block.data.items.forEach(function (item: any) {
          html += `
          <div class="surfooter__checkbox">
            <input type="checkbox" id="${item.text}" name="${item.text}" ${item.checked ? 'checked' : ''}>
            <label for="${item.text}">${item.text}</label>
          </div>`
        });
        html += '</div>';
        break;
      case 'quote':
        html += '<div class="surfooter__quote">';
        html += `<blockquote ${block.data.alignment ? `style="text-align: ${block.data.alignment}` : ''}">
        ${block.data.caption ? '<span>Author: ' + block.data.caption + '</span>' : ''}
        </blockquote>`;
        html += '</div>';
        break;
      case 'warning':
        html += `<div class="surfooter__warning">
          <div class="surfooter__warning__title">${block.data.title}</div>
          <div class="surfooter__warning__message">${block.data.message}</div>
        </div>`;
        break;
      case 'code':
        html += `<textarea class="surfooter__code">${block.data.code}</textarea>`;
        break;
      case 'table':
        html += '<div style="overflow-x: scroll">';
        html += '<table class="surfooter__table" style="width:100%">';
        block.data.content.forEach(function (tableRow: any, index: number) {
          html += '<tr>';
          tableRow.forEach(function (tableCol: any) {
            if (index === 0) {
              html += `<th>${tableCol}</th>`;
            } else {
              html += `<td>${tableCol}</td>`;
            }
          });
          html += '</tr>';
        });
        html += '</table>';
        html += '</div>';
        break;
      default:
        console.warn('Unknown block type', block.type);
        console.warn(block);
        break;
    }
  }
  html += `</div>`
  const seoFaqs = document.querySelector('#surfooter__seo-faqs-preview').innerHTML;
  if (seoFaqs) html += `<script type="application/ld+json">${seoFaqs}</script>`;
  html = beautifyString(html);
  return html;
}

const copyToClipboard = (html: string) => {
  const copyListener = (e: any) => {
    e.clipboardData.setData('text/html', html);
    e.clipboardData.setData('text/plain', html);
    showAlert('Surfooter Code was copied.');
    e.preventDefault();
  };
  document.addEventListener('copy', copyListener);
  document.execCommand('copy');
  document.removeEventListener('copy', copyListener);
}


// insert faq section
document.querySelector('#seo-faqs').addEventListener('submit', (e) => {
  e.preventDefault();
  const form: EventTarget = e.target;
  const textforms: NodeList = (form as HTMLFormElement).querySelectorAll('.seo-faq');
  const finalFAQs = {
    '@context': <string>'https://schema.org',
    '@type': <string>'FAQPage',
    'mainEntity': <any>[],
  };
  textforms.forEach((faq) => {
    const question: string = (faq as HTMLElement).querySelector<HTMLTextAreaElement>('.seo-faq__question').value.trim();
    const answer: string = (faq as HTMLElement).querySelector<HTMLTextAreaElement>('.seo-faq__answer').value.trim();
    const singleFAQ = {
      '@type': 'Question',
      'name': question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': answer,
      },
    };
    finalFAQs.mainEntity.push(singleFAQ);
  });
  const scriptString = JSON.stringify(finalFAQs);
  // insert preview
  document.querySelector('#surfooter__seo-faqs-preview').innerHTML = scriptString;
  // Show alert
  showAlert('SEO FAQs are added to the surfooter code.');
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
    <button class="seo-faq__remove">X</button>
    <hr>
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
    const html = copySurfooterMarkup(savedData);
    download("surfooter-code.html", html);
  });
});

