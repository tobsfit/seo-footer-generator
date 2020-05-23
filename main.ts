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