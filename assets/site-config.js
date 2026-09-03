/* Terencio Verde — shared configuration and site behavior. */
(function () {
  "use strict";

  const SITE = "https://www.terencioverde.xyz";

  window.TERENCIO_CONFIG = Object.freeze({
    tagline: "Independent Apparel · Art · Culture · Technology",
    musicEnabled: true,
    musicFile: "/assets/do-you-remember.mp3",
    musicCredit: "Music by Terence Green and the Loose Strings",
    musicStart: 50,
    musicEnd: 80,
    storeEnabled: false,
    interactiveApparelEnabled: true
  });

  const pageMeta = {
    "/": ["Terencio Verde | Independent Apparel, Art & Interactive Clothing", "Terencio Verde is an independent apparel brand rooted in Central Texas, blending hometown culture, artist collaborations, Web3 and interactive clothing."],
    "/index.html": ["Terencio Verde | Independent Apparel, Art & Interactive Clothing", "Terencio Verde is an independent apparel brand rooted in Central Texas, blending hometown culture, artist collaborations, Web3 and interactive clothing."],
    "/hometown.html": ["Hometown Collection | Terencio Verde", "Explore the Terencio Verde Hometown collection: apparel inspired by regional culture, Americana, music, local stories and the places that stay with us."],
    "/collaborations.html": ["Artist Collaborations | Terencio Verde", "Terencio Verde artist collaborations pair independent, emerging and international artists with limited-run apparel and visible artist credit."],
    "/web3.html": ["Web3 Collection | Terencio Verde", "Explore Terencio Verde Web3 projects, digital characters, NFT-inspired artwork, Cosmic Dream Bog and connected physical merchandise."],
    "/interactive.html": ["Interactive Apparel | Terencio Verde", "Discover Terencio Verde interactive apparel: physical clothing designed to connect with digital experiences and evolving creative projects."]
  };

  function upsertMeta(selector, attributes) {
    let node = document.head.querySelector(selector);
    if (!node) {
      node = document.createElement("meta");
      document.head.appendChild(node);
    }
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
  }

  function addSeo() {
    const path = location.pathname || "/";
    const [title, description] = pageMeta[path] || pageMeta["/"];
    const canonicalPath = path === "/index.html" ? "/" : path;
    const canonical = SITE + canonicalPath;

    document.title = title;
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "Terencio Verde" });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: SITE + "/assets/hero-hometown.png" });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: SITE + "/assets/hero-hometown.png" });

    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    if (!document.head.querySelector('script[data-tv-structured-data]')) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.tvStructuredData = "true";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Terencio Verde",
        url: SITE,
        description: pageMeta["/"][1],
        sameAs: []
      });
      document.head.appendChild(script);
    }
  }

  function setupNavigation() {
    if (document.querySelector('script[src*="mobile-nav.js"]')) return;

    const header = document.querySelector("header, .site-header");
    const nav = header?.querySelector("nav, .site-nav");
    if (!header || !nav) return;

    if (!nav.id) nav.id = "siteNavigation";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "tv-nav-toggle";
    toggle.setAttribute("aria-label", "Open navigation");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", nav.id);
    toggle.innerHTML = "<span></span>";
    header.insertBefore(toggle, nav);

    const close = () => {
      header.classList.remove("tv-nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    };

    toggle.addEventListener("click", () => {
      const open = !header.classList.contains("tv-nav-open");
      header.classList.toggle("tv-nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    nav.addEventListener("click", event => event.target.closest("a") && close());
    document.addEventListener("keydown", event => event.key === "Escape" && close());
    window.addEventListener("resize", () => window.innerWidth > 850 && close(), { passive: true });
  }

  function applyFeatureToggles() {
    const config = window.TERENCIO_CONFIG;
    document.querySelectorAll("#storeNav").forEach(node => {
      node.style.display = config.storeEnabled ? "inline-flex" : "none";
    });
    document.querySelectorAll("#interactiveNav, #interactiveCard").forEach(node => {
      if (!config.interactiveApparelEnabled) node.style.display = "none";
    });
    if (!config.interactiveApparelEnabled && location.pathname === "/interactive.html") {
      location.replace("/");
    }
  }

  function applySharedText() {
    const config = window.TERENCIO_CONFIG;
    document.querySelectorAll("#footerTagline").forEach(node => {
      node.textContent = config.tagline;
    });
    document.querySelectorAll("#footerYear").forEach(node => {
      node.textContent = String(new Date().getFullYear());
    });
  }

  function markEmptyHeroArt() {
    document.querySelectorAll(".character-zone").forEach(zone => {
      if (!zone.querySelector("img, picture, video, svg")) {
        zone.closest(".hero")?.classList.add("hero-no-art");
      }
    });
  }

  function enhanceWeb3() {
    if (location.pathname !== "/web3.html") return;
    const hero = document.querySelector(".hero");
    if (!hero) return;

    hero.classList.add("tv-web3-hero");
    if (hero.querySelector(".tv-web3-photo-credit")) return;

    const credit = document.createElement("p");
    credit.className = "tv-web3-photo-credit";
    credit.append("Photo was taken by Terencio in the ");

    const link = document.createElement("a");
    link.href = "https://launch.otherside.xyz";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "launch.otherside.xyz";

    credit.appendChild(link);
    hero.appendChild(credit);
  }

  addSeo();

  document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    applyFeatureToggles();
    applySharedText();
    markEmptyHeroArt();
    enhanceWeb3();
  });
})();