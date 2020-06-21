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
    // console.log('insert content from switcher');
}
// Copy Code
document.querySelector('#copy-content-clipboard').addEventListener('click', function () {
    var clipboardContent = document.getElementById('clipboard').innerHTML;
    copySurfooterMarkup(clipboardContent);
    function copySurfooterMarkup(str) {
        var markup = str;
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
    var scriptString = JSON.stringify(finalFAQs);
    // insert preview
    document.querySelector('#surfooter__seo-faqs-preview').innerHTML = scriptString;
    // Show alert
    showAlert('SEO FAQs are added to the surfooter code.');
});
document.querySelector('#seo-faqs__more').addEventListener('click', function (e) {
    var addMore = e.target;
    var form = document.querySelector('#seo-faqs');
    var textforms = form.querySelectorAll('.seo-faq');
    var newQuestionNumber = textforms.length + 1;
    var newQuestion = "\n  <!-- question -->\n  <div class=\"seo-faq\">\n  <textarea class=\"seo-faq__question\">Question " + newQuestionNumber + "</textarea>\n    <textarea class=\"seo-faq__answer\" name=\"seo-faq__q" + newQuestionNumber + "\">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</textarea>\n    <button class=\"seo-faq__remove\">X</button>\n    <hr>\n  </div>";
    addMore.insertAdjacentHTML('beforebegin', newQuestion);
});
// Remove SEO Item
var allRemoveButtons = document.querySelectorAll('.seo-faq__remove');
allRemoveButtons.forEach(function (removeButton) {
    removeButton.addEventListener('click', removeSeoQuestion);
});
function removeSeoQuestion() {
    var currentItem = this.closest('.seo-faq');
    currentItem.remove();
}
var showAlert = function (message) {
    document.querySelector('.alert').classList.add("animate");
    document.querySelector('.alert').querySelector('p').innerHTML = message;
    setTimeout(function () {
        document.querySelector('.alert').classList.remove("animate");
        document.querySelector('.alert').querySelector('p').innerHTML = '';
    }, 7000);
};
