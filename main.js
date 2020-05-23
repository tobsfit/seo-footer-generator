var message = 'hello world';
console.log(message);
var ImageHandler = /** @class */ (function () {
    function ImageHandler(image) {
        this.image = image;
        this.allImages = image;
    }
    ImageHandler.prototype.attachEventListener = function () {
        var _this = this;
        this.allImages.forEach(function (element) {
            element.addEventListener('click', function (img) {
                console.log(img.target);
                _this.openModal(img.target);
            });
        });
    };
    ImageHandler.prototype.openModal = function (img) {
        var modal = document.getElementById("image-modal");
        var close = document.querySelector(".close");
        modal.style.display = "block";
    };
    return ImageHandler;
}());
var images = new ImageHandler(document.querySelectorAll('[data-editable-image]')).attachEventListener();
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
