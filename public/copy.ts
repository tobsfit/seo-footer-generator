// copy markup
export default function () {
  document.querySelector('#copy-content-clipboard').addEventListener('click', () => {
    console.log('copy-content-clipboard');
    var clipboardContent = document.getElementById("clipboard").innerHTML;
    copySurfooterMarkup(clipboardContent);

    function copySurfooterMarkup(str) {
      let markup = str
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