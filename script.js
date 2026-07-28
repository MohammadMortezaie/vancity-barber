const siteConfig = {
  shopName: "Vancity Barbershop",
  phoneDisplay: "(778) 903-2377",
  phoneHref: "tel:+17789032377",
  addressDisplay: "505 Bute St, Vancouver, BC V6E 2S8",
  addressHref:
    "https://maps.google.com/?q=505+Bute+St,+Vancouver,+BC+V6E+2S8",
  bookingHref: "#book",
  youtubeHref: "https://www.youtube.com/watch?v=HueapC-xd0o",
  reviewCount: 273,
  ratingValue: 5.0,
  seo: {
    pageTitle: "Vancity Barbershop | Top Barber in Vancouver",
    description:
      "Vancity Barbershop is a top barber in Vancouver for precision cuts, fades, face waxing, facial cleaning, and direct online booking at 505 Bute St, Vancouver, BC V6E 2S8."
  },
  barbers: [
    {
      name: "Master Barber Hamza",
      role: "Barber",
      image: "assets/hamza.jpg",
      imageAlt: "Hamza from Vancity Barbershop",
      bookingUrl: "https://calendar.app.google/mSLjBs4fMPibERrq7"
    },
    {
      name: "Damian",
      role: "Barber",
      image: "assets/damian.jpg",
      imageAlt: "Damian from Vancity Barbershop",
      bookingUrl: "https://calendar.app.google/WbitP88bB7vKEigu5"
    },
    {
      name: "Jinus",
      role: "PMU Artist",
      services:
        "Microblading, combo brows, powder Ambre brows, and lip blush pigmentation.",
      image: "assets/Jinus.jpeg",
      imageAlt: "Jinus, PMU Artist at Vancity Barbershop",
      bookingUrl: "https://calendar.app.google/4Xgq4h8KEA4j81CD9"
    }
  ],
  hairstyles: [
    {
      tag: "Slick Finish",
      name: "Slick Back Taper",
      copy:
        "Clean sides with controlled shine on top for clients who want a polished, sharper profile.",
      image:
        "https://images.unsplash.com/photo-1762914395007-03ca29612b9f?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      alt: "Man with a slicked-back taper hairstyle"
    },
    {
      tag: "Classic Fade",
      name: "Clean Skin Fade",
      copy:
        "A close blended fade with a short top for clients who want a crisp, athletic look.",
      image:
        "https://images.unsplash.com/photo-1589985494639-69e60c82cab2?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFkZSUyMGhhaXJjdXR8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=3000",
      alt: "Man getting a clean skin fade haircut"
    },
    {
      tag: "Bold Detail",
      name: "Line Design Fade",
      copy:
        "A stronger fade with carved detail work for clients who want the haircut itself to stand out.",
      image:
        "https://images.unsplash.com/photo-1568339434343-2a640a1a9946?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFkZSUyMGhhaXJjdXR8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=3000",
      alt: "Man with a fade haircut featuring shaved line design"
    }
  ]
};

const dom = {
  barberGrid: document.querySelector("#barber-grid"),
  barberTemplate: document.querySelector("#barber-card-template"),
  stylesTrack: document.querySelector("#styles-track"),
  styleTemplate: document.querySelector("#style-card-template"),
  currentYear: document.querySelector("#year")
};

function setMetaContent(id, value) {
  const element = document.querySelector(`#${id}`);

  if (element) {
    element.setAttribute("content", value);
  }
}

function setHrefAttribute(id, value) {
  const element = document.querySelector(`#${id}`);

  if (element && value) {
    element.setAttribute("href", value);
  }
}

function getCanonicalUrl() {
  if (typeof window === "undefined") {
    return "";
  }

  const { protocol, hostname, pathname, search, hash } = window.location;
  const isLocalHost =
    protocol === "file:" ||
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]" ||
    hostname === "0.0.0.0" ||
    /\.local$/i.test(hostname) ||
    /\.test$/i.test(hostname);

  if (isLocalHost || !hostname) {
    return "";
  }

  return `https://${hostname.replace(/^www\./i, "")}${pathname}${search}${hash}`;
}

function applyLink(element, href) {
  if (!element || !href) {
    return;
  }

  element.setAttribute("href", href);

  if (/^https?:\/\//i.test(href)) {
    element.setAttribute("target", "_blank");
    element.setAttribute("rel", "noreferrer");
  } else {
    element.removeAttribute("target");
    element.removeAttribute("rel");
  }
}

function renderSeoMeta() {
  const canonicalUrl = getCanonicalUrl();

  document.title = siteConfig.seo.pageTitle;
  setMetaContent("meta-description", siteConfig.seo.description);
  setMetaContent("meta-og-title", siteConfig.seo.pageTitle);
  setMetaContent("meta-og-description", siteConfig.seo.description);
  setMetaContent("meta-og-url", canonicalUrl);
  setMetaContent("meta-twitter-title", siteConfig.seo.pageTitle);
  setMetaContent("meta-twitter-description", siteConfig.seo.description);
  setHrefAttribute("canonical-url", canonicalUrl);
}

function renderStructuredData() {
  const schemaTarget = document.querySelector("#structured-data");
  const canonicalUrl = getCanonicalUrl();

  if (!schemaTarget) {
    return;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: siteConfig.shopName,
    description: siteConfig.seo.description,
    telephone: siteConfig.phoneDisplay,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "505 Bute St",
      addressLocality: "Vancouver",
      addressRegion: "BC",
      postalCode: "V6E 2S8",
      addressCountry: "CA"
    },
    hasMap: siteConfig.addressHref,
    areaServed: {
      "@type": "City",
      name: "Vancouver"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(siteConfig.ratingValue),
      reviewCount: String(siteConfig.reviewCount),
      bestRating: "5",
      worstRating: "1"
    }
  };

  if (canonicalUrl) {
    structuredData.url = canonicalUrl;
  }

  schemaTarget.textContent = JSON.stringify(structuredData);
}

function renderShopMeta() {
  document.querySelectorAll("[data-shop-name]").forEach((element) => {
    element.textContent = siteConfig.shopName;
  });

  document.querySelectorAll("[data-phone-display]").forEach((element) => {
    element.textContent = siteConfig.phoneDisplay;
  });

  document.querySelectorAll("[data-address-display]").forEach((element) => {
    element.textContent = siteConfig.addressDisplay;
  });

  document.querySelectorAll("[data-review-count]").forEach((element) => {
    element.textContent = String(siteConfig.reviewCount);
  });

  document.querySelectorAll("[data-rating-value]").forEach((element) => {
    element.textContent = siteConfig.ratingValue.toFixed(1);
  });

  document.querySelectorAll("[data-phone-href]").forEach((element) => {
    applyLink(element, siteConfig.phoneHref);
  });

  document.querySelectorAll("[data-address-href]").forEach((element) => {
    applyLink(element, siteConfig.addressHref);
  });

  document.querySelectorAll("[data-booking-href]").forEach((element) => {
    applyLink(element, siteConfig.bookingHref);
  });

  renderSeoMeta();
  renderStructuredData();
}

function renderBarbers() {
  if (!dom.barberGrid || !dom.barberTemplate) {
    return;
  }

  dom.barberGrid.textContent = "";
  const fragment = document.createDocumentFragment();

  siteConfig.barbers.forEach((barber, index) => {
    const node = dom.barberTemplate.content.cloneNode(true);
    const shell = node.querySelector(".barber-booking-shell");
    const bookingLink = node.querySelector("[data-barber-booking-link]");
    const image = node.querySelector("[data-barber-image]");
    const name = node.querySelector("[data-barber-name]");
    const copy = node.querySelector("[data-barber-copy]");
    const cardIndex = node.querySelector("[data-barber-index]");

    shell.classList.add(`reveal-delay-${Math.min(index, 3)}`);
    name.textContent = barber.name;
    copy.textContent =
      barber.services || `Book directly with ${barber.name}. Opens in a new tab.`;
    cardIndex.textContent = `${barber.role || "Specialist"} 0${index + 1}`;
    image.src = barber.image;
    image.alt = barber.imageAlt;
    bookingLink.setAttribute("aria-label", `Book an appointment with ${barber.name}`);
    applyLink(bookingLink, barber.bookingUrl);

    fragment.appendChild(node);
  });

  dom.barberGrid.appendChild(fragment);
}

function createStyleCard(style, isDuplicate = false) {
  const node = dom.styleTemplate.content.cloneNode(true);
  const card = node.querySelector(".style-card");
  const image = node.querySelector("[data-style-image]");
  const tag = node.querySelector("[data-style-tag]");
  const name = node.querySelector("[data-style-name]");
  const copy = node.querySelector("[data-style-copy]");

  if (isDuplicate) {
    card.setAttribute("aria-hidden", "true");
  }

  image.src = style.image;
  image.alt = style.alt;
  tag.textContent = style.tag;
  name.textContent = style.name;
  copy.textContent = style.copy;

  return node;
}

function syncStylesTrackWidth() {
  if (!dom.stylesTrack) {
    return;
  }

  const firstGroup = dom.stylesTrack.querySelector(".styles-group");

  if (!firstGroup) {
    return;
  }

  dom.stylesTrack.style.setProperty(
    "--styles-group-width",
    `${Math.ceil(firstGroup.getBoundingClientRect().width)}px`
  );
}

function renderHairstyles() {
  if (!dom.stylesTrack || !dom.styleTemplate) {
    return;
  }

  dom.stylesTrack.textContent = "";

  const primaryGroup = document.createElement("div");
  primaryGroup.className = "styles-group";

  const duplicateGroup = document.createElement("div");
  duplicateGroup.className = "styles-group";
  duplicateGroup.setAttribute("aria-hidden", "true");

  siteConfig.hairstyles.forEach((style) => {
    primaryGroup.appendChild(createStyleCard(style));
    duplicateGroup.appendChild(createStyleCard(style, true));
  });

  dom.stylesTrack.append(primaryGroup, duplicateGroup);
  syncStylesTrackWidth();
  window.requestAnimationFrame(syncStylesTrackWidth);
}

function setupRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function init() {
  renderShopMeta();
  renderBarbers();
  renderHairstyles();
  setupRevealAnimations();

  if (dom.currentYear) {
    dom.currentYear.textContent = new Date().getFullYear();
  }

  window.addEventListener("resize", syncStylesTrackWidth);
}

init();
