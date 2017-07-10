// Adding IIFE for variables scoping
(() => {
  const _anchors = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

  // Add anchor permalinks to any Header tag that has an id
  // Iterate over each header in array
  [..._anchors].forEach(anchor => {

    // If this header has an 'ID' attrbiute
    if (anchor.id) {

      // Create new link element, add attrbiutes and append it to the beggining or the header.
      const link = document.createElement('a');
      link.dataset.icon = '';
      link.classList.add('anchor-link');
      link.href = `#${anchor.id}`;
      anchor.insertBefore(link, anchor.firstChild);
    }
  });
})();
