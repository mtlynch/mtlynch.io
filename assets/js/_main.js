const _anchors = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

// adds anchor permalinks to any Header tag that has an id
[..._anchors].forEach(anchor => {
  if (anchor.id) {
    const link = document.createElement('a');
    link.dataset.icon = '';
    link.classList.add('anchor-link');
    link.href = `#${anchor.id}`;
    anchor.insertBefore(link, anchor.firstChild);
  }
});
