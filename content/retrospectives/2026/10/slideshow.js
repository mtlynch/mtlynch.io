(() => {
  // Oldest first. Captions default to UTC timestamps; edit them individually here.
  const slides = [
    {
      src: "timelapse/2026-09-07T15:50:13Z_afcd884f.png",
      caption: "September 7, 2026, 3:50 PM UTC",
    },
    {
      src: "timelapse/2026-09-07T15:57:31Z_f7a455ef.png",
      caption: "September 7, 2026, 3:57 PM UTC",
    },
    {
      src: "timelapse/2026-09-07T16:06:42Z_1a97bf2f.png",
      caption: "September 7, 2026, 4:06 PM UTC",
    },
    {
      src: "timelapse/2026-09-07T18:25:24Z_b1ae8527.png",
      caption: "September 7, 2026, 6:25 PM UTC",
    },
    {
      src: "timelapse/2026-09-07T18:40:32Z_ccbc693d.png",
      caption: "September 7, 2026, 6:40 PM UTC",
    },
    {
      src: "timelapse/2026-09-08T15:57:43Z_ac8c49dc.png",
      caption: "September 8, 2026, 3:57 PM UTC",
    },
    {
      src: "timelapse/2026-09-11T00:28:35Z_5291d994.png",
      caption: "September 11, 2026, 12:28 AM UTC",
    },
    {
      src: "timelapse/2026-09-18T19:07:57Z_42874177.png",
      caption: "September 18, 2026, 7:07 PM UTC",
    },
    {
      src: "timelapse/2026-09-18T19:12:49Z_5286700f.png",
      caption: "September 18, 2026, 7:12 PM UTC",
    },
    {
      src: "timelapse/2026-09-18T23:13:27Z_88158311.png",
      caption: "September 18, 2026, 11:13 PM UTC",
    },
    {
      src: "timelapse/2026-09-20T01:13:53Z_f30b5455.png",
      caption: "September 20, 2026, 1:13 AM UTC",
    },
    {
      src: "timelapse/2026-09-22T19:49:06Z_295491fe.png",
      caption: "September 22, 2026, 7:49 PM UTC",
    },
    {
      src: "timelapse/2026-09-23T16:56:12Z_251be4fa.png",
      caption: "September 23, 2026, 4:56 PM UTC",
    },
    {
      src: "timelapse/2026-09-23T17:24:34Z_065ea616.png",
      caption: "September 23, 2026, 5:24 PM UTC",
    },
    {
      src: "timelapse/2026-09-24T19:30:04Z_7a993b76.png",
      caption: "September 24, 2026, 7:30 PM UTC",
    },
    {
      src: "timelapse/2026-09-24T19:33:45Z_2e012e97.png",
      caption: "September 24, 2026, 7:33 PM UTC",
    },
    {
      src: "timelapse/2026-09-24T20:29:27Z_9ad1d229.png",
      caption: "September 24, 2026, 8:29 PM UTC",
    },
    {
      src: "timelapse/2026-09-25T17:35:51Z_de0963cb.png",
      caption: "September 25, 2026, 5:35 PM UTC",
    },
    {
      src: "timelapse/2026-09-25T18:19:54Z_a2998162.png",
      caption: "September 25, 2026, 6:19 PM UTC",
    },
    {
      src: "timelapse/2026-09-28T15:32:00Z_2ecc49b5.png",
      caption: "September 28, 2026, 3:32 PM UTC",
    },
    {
      src: "timelapse/2026-09-28T16:00:40Z_bf2c0f23.png",
      caption: "September 28, 2026, 4:00 PM UTC",
    },
    {
      src: "timelapse/2026-09-29T13:29:19Z_909d01aa.png",
      caption: "September 29, 2026, 1:29 PM UTC",
    },
    {
      src: "timelapse/2026-09-29T13:41:35Z_75fcd748.png",
      caption: "September 29, 2026, 1:41 PM UTC",
    },
    {
      src: "timelapse/2026-09-30T11:48:28Z_3211479f.png",
      caption: "September 30, 2026, 11:48 AM UTC",
    },
    {
      src: "timelapse/2026-09-30T13:05:40Z_eebd4609.png",
      caption: "September 30, 2026, 1:05 PM UTC",
    },
    {
      src: "timelapse/2026-09-30T17:16:32Z_0f1b3fab.png",
      caption: "September 30, 2026, 5:16 PM UTC",
    },
    {
      src: "timelapse/2026-09-30T17:21:50Z_72f2cb88.png",
      caption: "September 30, 2026, 5:21 PM UTC",
    },
    {
      src: "timelapse/2026-10-02T13:46:03Z_84494937.png",
      caption: "October 2, 2026, 1:46 PM UTC",
    },
    {
      src: "timelapse/2026-10-03T08:23:44Z_bcb1d7a8.png",
      caption: "October 3, 2026, 8:23 AM UTC",
    },
    {
      src: "timelapse/2026-10-12T19:47:06Z_eadc44ab.png",
      caption: "October 12, 2026, 7:47 PM UTC",
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
