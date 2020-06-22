class ImageHandler {
  allImages: NodeListOf<Element>;
  activeImage: any;
  modal: HTMLElement;
  modalAlt: HTMLInputElement;
  modalUrl: HTMLInputElement;

  constructor(public image: NodeListOf<Element>) {
    this.allImages = image;
    this.modal = document.getElementById('image-modal');
    this.modalAlt = this.modal.querySelector('#form-image--alt');
    this.modalUrl = this.modal.querySelector('#form-image--url');
  }

  attachEventListener() {
    this.allImages.forEach((element) => {
      element.addEventListener('click', (img) => {
        this.activeImage = img.target;
        this.openModal();
      });
    });
  }

  openModal() {
    this.modal.style.display = 'block';
    this.modalAlt.value = this.activeImage.alt;
    this.modalUrl.value = this.activeImage.src;

    // submit form
    const form = document.querySelector('#form-image');
    form.addEventListener('submit', (form) => {
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
    this.modal.style.display = 'none';
  }
}

interface Image {
  imageElement: NodeListOf<Element>;
}

new ImageHandler(
  document.querySelectorAll('[data-editable-image]')).attachEventListener(); 



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
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'https://tobsfit.github.io/surfooter-generator/simple-surfooter.html', false);
    xmlhttp.send();
    content = xmlhttp.responseText;
    columnWrapper.style.display = 'none';
  } else {
    columnWrapper.style.display = 'block';
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', `https://tobsfit.github.io/surfooter-generator/complex-surfooter-${numColumns}.html`, false);
    xmlhttp.send();
    content = xmlhttp.responseText;
  }
  document.querySelector('.surfooter').innerHTML = content;
  // console.log('insert content from switcher');
}

// Insert html code via textarea
document.querySelector('#insert-html__submit').addEventListener('click', (e) => {
  const textarea: HTMLTextAreaElement = document.querySelector('#insert-html__textarea');
  const clipboard: HTMLElement = document.querySelector('#clipboard');
  textarea.value.indexOf('data-editable=""') == -1 ? clipboard.innerHTML = `<div data-editable="">${textarea.value}</div>` : clipboard.innerHTML = textarea.value;
});

