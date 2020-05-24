export default function () {
  document.querySelector('#base').addEventListener('change', (e) => {
    updateContent();
  });
  document.querySelector('#num-columns').addEventListener('change', (e) => {
    updateContent();
  });

  function updateContent() {
    let content: string;
    const columnWrapper: HTMLSelectElement = document.querySelector('.dialog__columns');
    const numColumns: number = parseInt((document.querySelector('#num-columns') as HTMLInputElement).value);
    const switcher: number = parseInt((document.querySelector('#base') as HTMLInputElement).value);

    if (switcher == 1) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('GET', 'https://tobsfit.github.io/surfooter-generator/simple-surfooter.html', false);
      xmlhttp.send();
      content = xmlhttp.responseText;
      columnWrapper.style.display = "none";
    } else {
      columnWrapper.style.display = "block";
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('GET', `https://tobsfit.github.io/surfooter-generator/complex-surfooter-${numColumns}.html`, false);
      xmlhttp.send();
      content = xmlhttp.responseText;
    }
    document.querySelector('#clipboard').innerHTML = content;
    console.log('insert content from switcher');
  }
}