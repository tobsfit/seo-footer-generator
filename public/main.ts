class ImageHandler {
  allImages: NodeListOf<Element>;
  activeImage: any;
  modal: HTMLElement;
  modalAlt: HTMLInputElement;
  modalUrl: HTMLInputElement;

  constructor(public image: NodeListOf<Element>) {
    this.allImages = image;
    this.modal = document.getElementById("image-modal");
    this.modalAlt = this.modal.querySelector('#form-image--alt');
    this.modalUrl = this.modal.querySelector('#form-image--url');
  }

  attachEventListener() {
    this.allImages.forEach(element => {
      element.addEventListener('click', (img) => {
        this.activeImage = img.target;
        this.openModal();
      });
    });
  }

  openModal() {
    this.modal.style.display = "block";
    const close: HTMLElement = document.querySelector(".close");
    this.modalAlt.value = this.activeImage.alt;
    this.modalUrl.value = this.activeImage.src;

    // submit form
    const form = document.querySelector('#form-image').addEventListener('submit', (form) => {
      form.preventDefault();
      this.updateImage();
    });
  }

  updateImage() {
    this.activeImage.alt = this.modalAlt.value;
    this.activeImage.src = this.modalUrl.value;
    this.closeModal();
  }

  closeModal() {
    this.modal.style.display = "none";
  }

}

interface Image {
  imageElement: NodeListOf<Element>;
}

let images = new ImageHandler(document.querySelectorAll('[data-editable-image]')).attachEventListener();

// Switcher
document.querySelector('#base').addEventListener('change', (e) => {
  updateContent();
});

document.querySelector('#num-columns').addEventListener('change', (e) => {
  updateContent();
});

function updateContent() {
  let content: string;
  const columnWrapper: HTMLSelectElement = document.querySelector('.dialog__columns');
  const numColumns: number = parseInt((document.querySelector('#num-columns') as HTMLInputElement).value);
  const switcher: number = parseInt((document.querySelector('#base') as HTMLInputElement).value);

  if (switcher == 1) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'https://tobsfit.github.io/surfooter-generator/simple-surfooter.html', false);
    xmlhttp.send();
    content = xmlhttp.responseText;
    columnWrapper.style.display = "none";
  } else {
    columnWrapper.style.display = "block";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', `https://tobsfit.github.io/surfooter-generator/complex-surfooter-${numColumns}.html`, false);
    xmlhttp.send();
    content = xmlhttp.responseText;
  }
  document.querySelector('.surfooter').innerHTML = content;
  // console.log('insert content from switcher');
}

// Copy Code
document.querySelector('#copy-content-clipboard').addEventListener('click', () => {
  var clipboardContent = document.getElementById('clipboard').innerHTML;
  copySurfooterMarkup(clipboardContent);

  function copySurfooterMarkup(str) {
    let markup = str
    markup = markup
      .replace(/ data-editable=""/g, '')
      .replace(/ data-editable-image=""/g, '')
      .replace(/<code id="surfooter__seo-faqs-preview" lang="html5">/g, '<script type="application/ld+json">')
      .replace(/<\/code>/g, '</script>');
    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);

    function listener(e) {
      e.clipboardData.setData('text/html', markup);
      e.clipboardData.setData('text/plain', markup);
      showAlert('Surfooter Code was copied.');
      e.preventDefault();
    }
  }
});

// Insert html code via textarea
document.querySelector('#insert-html__submit').addEventListener('click', (e) => {
  const textarea: HTMLTextAreaElement = document.querySelector('#insert-html__textarea');
  const clipboard: HTMLElement = document.querySelector('#clipboard');
  let textareaContent: string = textarea.value;
  textarea.value.indexOf('data-editable=""') == -1 ? clipboard.innerHTML = `<div data-editable="">${textarea.value}</div>` : clipboard.innerHTML = textarea.value;
});

// insert faq section
document.querySelector('#seo-faqs').addEventListener('submit', (e) => {
  e.preventDefault();
  const form: EventTarget = e.target;
  const textforms: NodeList = (form as HTMLFormElement).querySelectorAll('.seo-faq');
  let finalFAQs = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": []
  };
  textforms.forEach(faq => {
    const question: string = (faq as HTMLElement).querySelector<HTMLTextAreaElement>('.seo-faq__question').value.trim();
    const answer: string = (faq as HTMLElement).querySelector<HTMLTextAreaElement>('.seo-faq__answer').value.trim();
    // console.log((element as HTMLTextAreaElement).value);
    const singleFAQ = {
      "@type": "Question",
      "name": question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answer
      }
    };
    finalFAQs.mainEntity.push(singleFAQ)
  });
  const scriptString =  JSON.stringify(finalFAQs);
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

const showAlert = (message) => {
  document.querySelector<HTMLElement>('.alert').classList.add("animate");
  document.querySelector<HTMLElement>('.alert').querySelector('p').innerHTML = message;
  setTimeout(() => {
    document.querySelector<HTMLElement>('.alert').classList.remove("animate");
    document.querySelector<HTMLElement>('.alert').querySelector('p').innerHTML = '';
  }, 7000);
}