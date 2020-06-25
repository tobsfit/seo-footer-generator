const showAlert = (message: string) => {
  document.querySelector<HTMLElement>('.alert').classList.add('animate');
  document.querySelector<HTMLElement>('.alert').querySelector('p').innerHTML = message;
  // Remove message after 10 sec
  setTimeout(() => {
    document.querySelector<HTMLElement>('.alert').classList.remove('animate');
    document.querySelector<HTMLElement>('.alert').querySelector('p').innerHTML = '';
  }, 10000);
};

export default showAlert;