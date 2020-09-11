export default class SeoFaq {
  constructor({data, api}){
    this.api = api;
    this.data = data;
  }

  static get toolbox() {
    return {
      title: 'Image',
      icon: `<i>SEO</i>`
    };
  }

  render() {
    const textforms = document.querySelectorAll('.seo-faq');
    const finalFAQs = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [],
    };
    textforms.forEach(faq => {
      const question = faq.querySelector('.seo-faq__question').value.trim();
      const answer = faq.querySelector('.seo-faq__answer').value.trim();
      const singleFAQ = {
        '@type': 'Question',
        'name': question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': answer,
        },
      };
      finalFAQs.mainEntity.push(singleFAQ);
    });
    const scriptString = JSON.stringify(finalFAQs);
    const codeTag = document.createElement('code');
    codeTag.innerHTML = scriptString;
    return codeTag
  }

  save(blockContent){
    return {
      content: blockContent.innerHTML
    }
  }
}