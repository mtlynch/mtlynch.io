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
      caption: "Change quote and example borders from lavender to gray",
    },
    {
      src: "timelapse/2026-09-07T18:25:24Z_b1ae8527.webp",
      caption: "Move inline URLs to footnotes",
    },
    {
      src: "timelapse/2026-09-07T18:40:32Z_ccbc693d.webp",
      caption: "Add tinted example boxes with separate label columns",
    },
    {
      src: "timelapse/2026-09-08T15:57:43Z_ac8c49dc.webp",
      caption: "Add space between the BAD icon and label",
    },
    {
      src: "timelapse/2026-09-11T00:28:35Z_5291d994.webp",
      caption: "Adjust example colors and label spacing",
    },
    {
      src: "timelapse/2026-09-18T19:07:57Z_42874177.webp",
      caption: "Reduce font sizes so the chapter title fits on one line",
    },
    {
      src: "timelapse/2026-09-18T19:12:49Z_5286700f.webp",
      caption: "Change the quote border from gray to purple",
    },
    {
      src: "timelapse/2026-09-18T23:13:27Z_88158311.webp",
      caption: "Update the page number from 51 to 53",
    },
    {
      src: "timelapse/2026-09-20T01:13:53Z_f30b5455.webp",
      caption: "Tighten paragraph spacing to fit more text on the page",
    },
    {
      src: "timelapse/2026-09-22T19:49:06Z_295491fe.webp",
      caption: "Add print bleed margins",
    },
    {
      src: "timelapse/2026-09-23T16:56:12Z_251be4fa.webp",
      caption: "Left-align body text instead of justifying it",
    },
    {
      src: "timelapse/2026-09-23T17:24:34Z_065ea616.webp",
      caption: "Reduce padding in the single-line example",
    },
    {
      src: "timelapse/2026-09-24T19:30:04Z_7a993b76.webp",
      caption: "Try a new BAD icon, which renders as a missing glyph",
    },
    {
      src: "timelapse/2026-09-24T19:33:45Z_2e012e97.webp",
      caption: "Put the chapter number and title on separate lines",
    },
    {
      src: "timelapse/2026-09-24T20:29:27Z_9ad1d229.webp",
      caption: "Fix the missing BAD icon",
    },
    {
      src: "timelapse/2026-09-25T17:35:51Z_de0963cb.webp",
      caption: "Remove print bleed margins",
    },
    {
      src: "timelapse/2026-09-25T18:19:54Z_a2998162.webp",
      caption: "Renumber the footnote from 1 to 2",
    },
    {
      src: "timelapse/2026-09-28T15:32:00Z_2ecc49b5.webp",
      caption: "Remove example background colors and make example text black",
    },
    {
      src: "timelapse/2026-09-28T16:00:40Z_bf2c0f23.webp",
      caption: "Use sans-serif GOOD/BAD labels without colons",
    },
    {
      src: "timelapse/2026-09-29T13:29:19Z_909d01aa.webp",
      caption: "Replace the footer's vertical separator with a middle dot",
    },
    {
      src: "timelapse/2026-09-29T13:41:35Z_75fcd748.webp",
      caption: "Remove the horizontal rule above the footer",
    },
    {
      src: "timelapse/2026-09-30T11:48:28Z_3211479f.webp",
      caption: "Use a thinner BAD icon",
    },
    {
      src: "timelapse/2026-09-30T13:05:40Z_eebd4609.webp",
      caption: "Refine checkmark styling and icon alignment",
    },
    {
      src: "timelapse/2026-09-30T17:16:32Z_0f1b3fab.webp",
      caption: "Move chapter content slightly upward",
    },
    {
      src: "timelapse/2026-09-30T17:21:50Z_72f2cb88.webp",
      caption: "Renumber the footnote from 2 to 1",
    },
    {
      src: "timelapse/2026-10-02T13:46:03Z_84494937.webp",
      caption: "Increase the space reserved for example labels",
    },
    {
      src: "timelapse/2026-10-03T08:23:44Z_bcb1d7a8.webp",
      caption: "Move the naming-server example to the next page",
    },
    {
      src: "timelapse/2026-10-12T19:47:06Z_eadc44ab.webp",
      caption: "Use thinner example borders and footnote rule",
    },
  ];

  const slideshow = document.getElementById("book-slideshow");
  const image = document.getElementById("book-slide-image");
  const link = document.getElementById("book-slide-link");
  const caption = document.getElementById("book-slide-caption");
  const position = document.getElementById("book-slide-position");
  const previous = document.getElementById("book-slide-previous");
  const next = document.getElementById("book-slide-next");
  const loading = document.getElementById("book-slide-loading");
  const upcomingImage = new Image();
  let current = 0;

  image.addEventListener("load", () => {
    link.setAttribute("aria-busy", "false");
    loading.hidden = true;
  });
  image.addEventListener("error", () => {
    link.setAttribute("aria-busy", "false");
    loading.textContent =
      "Image unavailable. Click to retry opening the revision.";
    loading.hidden = false;
  });

  function showSlide(index) {
    if (index < 0 || index >= slides.length) {
      return;
    }

    current = index;
    const slide = slides[current];
    const src = `/retrospectives/2026/10/${slide.src}`;
    image.src = src;
    image.alt = `Chapter 7, Verbs Drive the Sentence — ${slide.caption}`;
    link.href = src;
    const isLoading = !(image.complete && image.naturalWidth > 0);
    link.setAttribute("aria-busy", isLoading);
    loading.textContent = "Loading revision…";
    loading.hidden = !isLoading;
    caption.textContent = slide.caption;
    position.textContent = `${current + 1} / ${slides.length}`;
    // Keep boundary buttons focusable so arrow-key navigation still works.
    previous.setAttribute("aria-disabled", current === 0);
    next.setAttribute("aria-disabled", current === slides.length - 1);
    if (current + 1 < slides.length) {
      upcomingImage.src = `/retrospectives/2026/10/${slides[current + 1].src}`;
    }
  }

  previous.addEventListener("click", () => showSlide(current - 1));
  next.addEventListener("click", () => showSlide(current + 1));
  slideshow.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(current + (event.key === "ArrowLeft" ? -1 : 1));
    }
  });

  showSlide(0);
  slideshow.tabIndex = 0;
  document.getElementById("book-slide-controls").hidden = false;
})();
