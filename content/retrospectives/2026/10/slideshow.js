(() => {
  // Oldest first. Captions describe what changed since the previous image.
  const slides = [
    {
      src: "timelapse/2026-09-07T15:50:13Z_afcd884f.webp",
      caption: "Initial print version",
    },
    {
      src: "timelapse/2026-09-07T15:57:31Z_f7a455ef.webp",
      caption: "Add GOOD/BAD prefix and icons to examples",
    },
    {
      src: "timelapse/2026-09-07T16:06:42Z_1a97bf2f.webp",
      caption: "Change quote and example borders to gray",
    },
    {
      src: "timelapse/2026-09-07T18:25:24Z_b1ae8527.webp",
      caption: "Change links from inline URLs to footnotes",
    },
    {
      src: "timelapse/2026-09-07T18:40:32Z_ccbc693d.webp",
      caption: "Change GOOD/BAD examples to colored callout boxes",
    },
    {
      src: "timelapse/2026-09-08T15:57:43Z_ac8c49dc.webp",
      caption: "Left-align the GOOD/BAD labels with each other",
    },
    {
      src: "timelapse/2026-09-11T00:28:35Z_5291d994.webp",
      caption: "Tweak colors and spacing in example callouts",
    },
    {
      src: "timelapse/2026-09-18T19:07:57Z_42874177.webp",
      caption: "Reduce font sizes and increase page margins",
    },
    {
      src: "timelapse/2026-09-18T19:12:49Z_5286700f.webp",
      caption: "Change the quote border from gray to purple",
    },
    {
      src: "timelapse/2026-09-20T01:13:53Z_f30b5455.webp",
      caption: "Reduce spacing between paragraphs",
    },
    {
      src: "timelapse/2026-09-23T16:56:12Z_251be4fa.webp",
      caption: "Left-align body text instead of justifying it",
    },
    {
      src: "timelapse/2026-09-23T17:24:34Z_065ea616.webp",
      caption: "Fix code font to match the height of surrounding text",
    },
    {
      src: "timelapse/2026-09-24T19:30:04Z_7a993b76.webp",
      caption: "Changed font, temporarily breaking the BAD icon",
    },
    {
      src: "timelapse/2026-09-24T19:33:45Z_2e012e97.webp",
      caption:
        "Split the chapter number and title into separate lines to avoid random line breaks in chapter names",
    },
    {
      src: "timelapse/2026-09-24T20:29:27Z_9ad1d229.webp",
      caption: "Fixed the missing BAD icon and switch from ❌ to ✗",
    },
    {
      src: "timelapse/2026-09-25T18:19:54Z_a2998162.webp",
      caption: "Introduced a bug that messed up footnote numbering",
    },
    {
      src: "timelapse/2026-09-28T15:32:00Z_2ecc49b5.webp",
      caption: "Reduced color in example callouts",
    },
    {
      src: "timelapse/2026-09-28T16:00:40Z_bf2c0f23.webp",
      caption: "Removed colons from GOOD/BAD prefixes",
    },
    {
      src: "timelapse/2026-09-29T13:29:19Z_909d01aa.webp",
      caption:
        "In the page footer, replace the vertical separator with a middle dot",
    },
    {
      src: "timelapse/2026-09-29T13:41:35Z_75fcd748.webp",
      caption: "Remove the horizontal rule above the footer",
    },
    {
      src: "timelapse/2026-09-30T13:05:40Z_eebd4609.webp",
      caption: "Use thinner icons for GOOD/BAD",
    },
    {
      src: "timelapse/2026-09-30T17:16:32Z_0f1b3fab.webp",
      caption: "Reduced vertical margin slightly",
    },
    {
      src: "timelapse/2026-09-30T17:21:50Z_72f2cb88.webp",
      caption: "Fixed numbering bug on footnotes",
    },
    {
      src: "timelapse/2026-10-02T13:46:03Z_84494937.webp",
      caption: "Adjusted alignment in example callouts",
    },
    {
      src: "timelapse/2026-10-03T08:23:44Z_bcb1d7a8.webp",
      caption:
        "Moved the naming-server example to the next page so that GOOD/BAD appear on the same page",
    },
    {
      src: "timelapse/2026-10-12T19:47:06Z_eadc44ab.webp",
      caption:
        "Reduce the thicknes of the example borders and footnote horizontal rule",
    },
  ];

  const slideshow = document.getElementById("book-slideshow");
  const pair = slideshow.querySelector(".book-slide-pair");
  const caption = pair.querySelector(".book-slide-caption");
  const panels = Array.from(
    pair.querySelectorAll(".book-slide-link"),
    (link) => ({
      image: link.querySelector(".book-slide-image"),
      link,
      errorMessage: link.querySelector(".book-slide-error"),
      outgoingImage: null,
    }),
  );
  const first = document.getElementById("book-slide-first");
  const previous = document.getElementById("book-slide-previous");
  const next = document.getElementById("book-slide-next");
  const last = document.getElementById("book-slide-last");
  const lastSlide = slides.length - 1;
  const preloadedImages = new Map();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobile = window.matchMedia("(max-width: 768px)");
  // Track the captioned revision: the right page on desktop, the only page on mobile.
  let current = mobile.matches ? 0 : 1;
  let latestRequest = 0;

  function getImage(index) {
    if (!preloadedImages.has(index)) {
      const preloaded = new Image();
      preloaded.src = `/retrospectives/2026/10/${slides[index].src}`;
      preloadedImages.set(index, preloaded);
    }
    return preloadedImages.get(index);
  }

  function preloadNearby() {
    const first = Math.max(0, current - 3);
    const last = Math.min(slides.length - 1, current + 4);
    for (let index = first; index <= last; index++) {
      if (index !== current) {
        getImage(index);
      }
    }
  }

  async function decodeImage(index) {
    try {
      await getImage(index).decode();
      return true;
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "EncodingError")) {
        throw error;
      }
      // Allow a failed prefetch to be retried on a later visit.
      preloadedImages.delete(index);
      return false;
    }
  }

  async function showSlides(index, refresh = false) {
    const firstSlide = mobile.matches ? 0 : 1;
    if (
      index < firstSlide ||
      index > lastSlide ||
      (!refresh && index === current)
    ) {
      return;
    }

    current = index;
    const request = ++latestRequest;
    // Keep boundary buttons focusable so arrow-key navigation still works.
    first.setAttribute("aria-disabled", current === firstSlide);
    previous.setAttribute("aria-disabled", current === firstSlide);
    next.setAttribute("aria-disabled", current === lastSlide);
    last.setAttribute("aria-disabled", current === lastSlide);
    pair.setAttribute("aria-busy", "true");

    preloadNearby();
    const indices = mobile.matches ? [null, index] : [index - 1, index];
    const loaded = await Promise.all(
      indices.map((slideIndex) =>
        slideIndex === null ? false : decodeImage(slideIndex),
      ),
    );
    // Ignore images that finish loading after a newer navigation request.
    if (request !== latestRequest) {
      return;
    }

    panels.forEach((panel, offset) => {
      const { image, link, errorMessage } = panel;
      panel.outgoingImage?.remove();
      panel.outgoingImage = null;
      if (indices[offset] === null) {
        return;
      }
      const slide = slides[indices[offset]];
      const src = `/retrospectives/2026/10/${slide.src}`;
      if (
        !refresh &&
        loaded[offset] &&
        !image.hidden &&
        !reducedMotion.matches
      ) {
        const overlay = image.cloneNode();
        overlay.className = "book-slide-outgoing";
        overlay.alt = "";
        overlay.setAttribute("aria-hidden", "true");
        link.prepend(overlay);
        panel.outgoingImage = overlay;
        overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 220,
          easing: "ease-in-out",
        }).onfinish = () => overlay.remove();
      }

      image.src = src;
      image.alt = `Chapter 7, Verbs Drive the Sentence — ${slide.caption}`;
      image.hidden = !loaded[offset];
      link.href = src;
      errorMessage.hidden = loaded[offset];
    });
    caption.textContent = slides[index].caption;
    pair.setAttribute("aria-busy", "false");
  }

  first.addEventListener("click", () => showSlides(mobile.matches ? 0 : 1));
  previous.addEventListener("click", () => showSlides(current - 1));
  next.addEventListener("click", () => showSlides(current + 1));
  last.addEventListener("click", () => showSlides(lastSlide));
  mobile.addEventListener("change", () => {
    showSlides(Math.max(mobile.matches ? 0 : 1, current), true);
  });
  slideshow.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      showSlides(current + (event.key === "ArrowLeft" ? -1 : 1));
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      showSlides(event.key === "Home" ? (mobile.matches ? 0 : 1) : lastSlide);
    }
  });

  showSlides(current, true);
  slideshow.tabIndex = 0;
  document.getElementById("book-slide-controls").hidden = false;
})();
