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
// Switcher
document.querySelector('#base').addEventListener('change', function (e) {
    updateContent();
});
document.querySelector('#num-columns').addEventListener('change', function (e) {
    updateContent();
});
function updateContent() {
    var content;
    var columnWrapper = document.querySelector('.dialog__columns');
    var numColumns = parseInt(document.querySelector('#num-columns').value);
    var switcher = parseInt(document.querySelector('#base').value);
    if (switcher == 1) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', 'https://tobsfit.github.io/surfooter-generator/simple-surfooter.html', false);
        xmlhttp.send();
        content = xmlhttp.responseText;
        columnWrapper.style.display = "none";
    }
    else {
        columnWrapper.style.display = "block";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', "https://tobsfit.github.io/surfooter-generator/complex-surfooter-" + numColumns + ".html", false);
        xmlhttp.send();
        content = xmlhttp.responseText;
    }
    document.querySelector('.surfooter').innerHTML = content;
    console.log('insert content from switcher');
}
// Copy Code
document.querySelector('#copy-content-clipboard').addEventListener('click', function () {
    console.log('copy-content-clipboard');
    var clipboardContent = document.getElementById("clipboard").innerHTML;
    copySurfooterMarkup(clipboardContent);
    function copySurfooterMarkup(str) {
        var markup = str;
        markup = markup.replace(/ data-editable=""/g, '').replace(/ data-editable-image=""/g, '');
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
document.querySelector('#insert-html__submit').addEventListener('click', function (e) {
    var textarea = document.querySelector('#insert-html__textarea');
    var clipboard = document.querySelector('#clipboard');
    var textareaContent = textarea.value;
    textarea.value.indexOf('data-editable=""') == -1 ? clipboard.innerHTML = "<div data-editable=\"\">" + textarea.value + "</div>" : clipboard.innerHTML = textarea.value;
});
// insert faq section
document.querySelector('#seo-faqs').addEventListener('submit', function (e) {
    e.preventDefault();
    var form = e.target;
    var textforms = form.querySelectorAll('.seo-faq');
    var finalFAQs = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": []
    };
    textforms.forEach(function (faq) {
        var question = faq.querySelector('.seo-faq__question').value.trim();
        var answer = faq.querySelector('.seo-faq__answer').value.trim();
        // console.log((element as HTMLTextAreaElement).value);
        var singleFAQ = {
            "@type": "Question",
            "name": question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": answer
            }
        };
        finalFAQs.mainEntity.push(singleFAQ);
    });
    // append script tag to clipboard
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(finalFAQs);
    document.querySelector('#clipboard').appendChild(script);
    // Show alert
    showAlert('SEO FAQs are added to the surfooter code.');
});
var showAlert = function (message) {
    document.querySelector('.alert').classList.add("animate");
    document.querySelector('.alert').querySelector('p').innerHTML = message;
    setTimeout(function () {
        document.querySelector('.alert').classList.remove("animate");
        document.querySelector('.alert').querySelector('p').innerHTML = '';
    }, 7000);
};
