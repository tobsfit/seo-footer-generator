var ImageHandler = /** @class */ (function () {
    function ImageHandler(image) {
        this.image = image;
        this.allImages = image;
        this.modal = document.getElementById("image-modal");
        this.modalAlt = this.modal.querySelector('#form-image--alt');
        this.modalUrl = this.modal.querySelector('#form-image--url');
    }
    ImageHandler.prototype.attachEventListener = function () {
        var _this = this;
        this.allImages.forEach(function (element) {
            element.addEventListener('click', function (img) {
                _this.activeImage = img.target;
                _this.openModal();
            });
        });
    };
    ImageHandler.prototype.openModal = function () {
        var _this = this;
        this.modal.style.display = "block";
        var close = document.querySelector(".close");
        this.modalAlt.value = this.activeImage.alt;
        this.modalUrl.value = this.activeImage.src;
        // submit form
        var form = document.querySelector('#form-image').addEventListener('submit', function (form) {
            form.preventDefault();
            _this.updateImage();
        });
    };
    ImageHandler.prototype.updateImage = function () {
        this.activeImage.alt = this.modalAlt.value;
        this.activeImage.src = this.modalUrl.value;
        this.closeModal();
    };
    ImageHandler.prototype.closeModal = function () {
        this.modal.style.display = "none";
    };
    return ImageHandler;
}());
var images = new ImageHandler(document.querySelectorAll('[data-editable-image]')).attachEventListener();
