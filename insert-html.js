document.querySelector('#insert-html__submit').addEventListener('click', function (e) {
    var textarea = document.querySelector('#insert-html__textarea');
    var clipboard = document.querySelector('#clipboard');
    var textareaContent = textarea.value;
    textarea.value.indexOf('data-editable=""') == -1 ? clipboard.innerHTML = "<div data-editable=\"\">" + textarea.value + "</div>" : clipboard.innerHTML = textarea.value;
});
