"use strict";
exports.__esModule = true;
exports.copy = void 0;
// copy markup
function copy() {
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
                e.preventDefault();
            }
        }
    });
}
exports.copy = copy;
