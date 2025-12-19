export const scrollToContent = (e, contentId) => {
  e.preventDefault();

  const content = document.getElementById(contentId);
  console.log('content', content)
  if (content) {
    content.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }
};