export const scrollToContent = (e, contentId) => {
  e.preventDefault();

  const content = document.getElementById(contentId);
 
  if (content) {
    content.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }
};