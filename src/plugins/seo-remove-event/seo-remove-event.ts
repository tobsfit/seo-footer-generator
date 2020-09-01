// Remove single SEO item
const eventRemoveButtonsSeo = () => {
  const allRemoveButtons = document.querySelectorAll('.seo-faq__remove');
  if (allRemoveButtons.length > 0) {
    // addEventListener
    allRemoveButtons.forEach((removeButton) => {
      removeButton.addEventListener('click', function () {
        const currentItem: HTMLElement = (this as any).closest('.seo-faq');
        currentItem.remove();
      });
    });
  }
}
export default eventRemoveButtonsSeo;