document.querySelector('#insert-html__submit').addEventListener('click', (e) => {
  const textarea: HTMLTextAreaElement = document.querySelector('#insert-html__textarea');
  const clipboard: HTMLElement = document.querySelector('#clipboard');
  let textareaContent: string = textarea.value;
  textarea.value.indexOf('data-editable=""') == -1 ? clipboard.innerHTML = `<div data-editable="">${textarea.value}</div>` : clipboard.innerHTML = textarea.value;
});
