/**
 * @fileoverview This file houses functionality developed externally from the
 * theme's javascript files.  It is compiled and included in the site's
 * main.min.js
 */

(function() {
  const _anchors = $('h1, h2, h3, h4, h5, h6');

  //adds anchor permalinks to any Header tag that has an id
  $(_anchors).each(function (i, el) {
    var $el, id, permalink;
    $el = $(el);
    id = $el.attr('id');
    if (id) {
      if ( $('#blog-nav-page').length ) {
        permalink = $('.blog-entry').attr('id') + "#" + id;
      } else {
        permalink = "#" + id
      }
      return $el.prepend($("<a />").addClass("anchor-link")
        .attr("href", permalink).attr("data-icon", ""));
    }
  });
})();

// enables hashtag relocation on in-page anchor links
$(window).bind('hashchange', function(event) {
  $.smoothScroll({
    // Replace '#/' with '#' to go to the correct target and after scrollin
    scrollTarget: location.hash.replace(/^\#\/?/, '#'),
    afterScroll: function() {
      location.hash = location.hash.replace(/^\#\/?/, '#');
    }
  });
});

$('a[href*="#"]')
.bind('click', function(event) {
  // Remove '#' from the hash.
  var hash = this.hash.replace(/^#/, '')

  if (this.pathname === location.pathname && hash) {
    event.preventDefault();

    // Change '#' (removed above) to '#/' so it doesn't jump without the smooth
    // scrolling
    location.hash = '#/' + hash;
  }
});

// Trigger hashchange event on page load if there is a hash in the URL.
if (location.hash) {
  $(window).trigger('hashchange');
}
