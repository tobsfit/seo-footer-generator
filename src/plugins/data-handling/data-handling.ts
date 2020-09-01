const fillDataFromFile = (content: any, type: string) => {
  if (type === 'config') return content;
  const newContent = {};
  (newContent as any).blocks = [];
  // Replace all html tags
  const pureContent = content // content.replace(/(<([^>]+)>)/ig, '');
  const splitContentNewline = pureContent.split('\n');
  for (let paragraph of splitContentNewline) {
    // Check if it's an empty line, if it is empty skip it
    if (paragraph.length === 0) continue;
    
    // Check for other html tags
    const headingRegex = new RegExp('(<h[1-6]>)|(</h[1-6]>)');
    if (headingRegex.test(paragraph)) {
      const newHeadline = insertHeadline(paragraph, headingRegex);
      (newContent as any).blocks.push(newHeadline);
      continue; 
    }
    
    // Create new paragraph data object
    const newParagraph = {
      type: 'paragraph',
      data: {
        text: paragraph,
      }
    };
    (newContent as any).blocks.push(newParagraph);
  };
  return newContent;
}

const insertHeadline = (headline: any, regex: any): object => {
  const pureContent = headline.replace(regex, '');
  const newHeadline = {
    type: 'header',
    data: {
      level: 3,
      text: pureContent
    }
  };
  return newHeadline;
}

export default fillDataFromFile