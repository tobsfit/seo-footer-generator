const message: string = 'hello world';
console.log(message);


class ImageHandler {
  allImages: NodeListOf<Element>;
  
  constructor(public image: NodeListOf<Element>) {
    this.allImages = image;
  }
  
  attachEventListener() {
    this.allImages.forEach(element => {
      element.addEventListener('click', (img) => {
        console.log(img.target);
        this.openModal(img.target);
      });
    });
  }

  openModal(img) {
    const modal: HTMLElement = document.getElementById("image-modal");
    const close: HTMLElement = document.querySelector(".close");
    modal.style.display = "block";
  }
}

interface Image {
  imageElement: NodeListOf<Element>;
}

let images = new ImageHandler(document.querySelectorAll('[data-editable-image]')).attachEventListener();


// editableImages.forEach(function (elem, index) {
//   elem.addEventListener('click', (e) => {
//     var currentImage = e.target;
//     console.log(currentImage)
//     var modal = document.getElementById("image-modal");
//     var btn = currentImage;
//     var close = document.getElementsByClassName("close")[0];
//     modal.style.display = "block";
//     // close modal
//     close.onclick = function () {
//       modal.style.display = "none";
//     }
//     window.onclick = function (event) {
//       if (event.target == modal) {
//         modal.style.display = "none";
//       }
//     }
//     // submit form
//     document.querySelector('#form-image').addEventListener('submit', (formData) => {
//       console.log(formData);
//       closeModal(currentImage);
//       e.preventDefault();
//     });

//     function closeModal(image) {
//       image.alt = document.querySelector('#form-image--alt').value;
//       image.src = document.querySelector('#form-image--url').value;
//       modal.style.display = "none";
//     }

//   });