/**
 * @fileoverview This file houses functionality developed externally from the
 * theme's javascript files.  It is compiled and included in the site's
 * main.min.js
 */

// Adding IIFE for variables scoping
(() => {
  const _anchors = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

  // Add anchor permalinks to any Header tag that has an id
  // Iterate over each header in array
  [..._anchors].forEach(anchor => {

    // If this header has an 'ID' attribute
    if (anchor.id) {

      // Create new link element, add attributes, and append it to the header.
      const link = document.createElement('a');
      link.dataset.icon = '';
      link.classList.add('anchor-link');
      link.href = `#${anchor.id}`;
      anchor.insertBefore(link, anchor.firstChild);
    }
  });
})();

// enables hashtag relocation on in-page anchor links
$(window).bind('hashchange', event => {
  $.smoothScroll({
    // Replace '#/' with '#' to go to the correct target and after scrolling
    scrollTarget: location.hash.replace(/^\#\/?/, '#'),
    afterScroll(options) {
      location.hash = location.hash.replace(/^\#\/?/, '#');
    }
  });
});

$('a[href*="#"]').bind('click', function(event) {
  // Remove '#' from the hash.
  let hash = this.hash.replace(/^#/, '');

  if (this.pathname === location.pathname && hash) {
    event.preventDefault();

    // Change '#' (removed above) to '#/' so it doesn't jump without the smooth scrolling
    location.hash = `#/${hash}`;
  }
});

// Trigger hashchange event on page load if there is a hash in the URL.
if (location.hash) {
  $(window).trigger('hashchange');
}
