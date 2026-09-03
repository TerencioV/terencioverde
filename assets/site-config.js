/* Terencio Verde — shared site configuration and progressive enhancements */
(function () {
  "use strict";

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

  const SITE = "https://www.terencioverde.xyz";
  const pageMeta = {
    "/": {
      title: "Terencio Verde | Independent Apparel, Art & Interactive Clothing",
      description: "Terencio Verde is an independent apparel brand rooted in Central Texas, blending hometown culture, artist collaborations, Web3 and interactive clothing."
    },
    "/index.html": {
      title: "Terencio Verde | Independent Apparel, Art & Interactive Clothing",
      description: "Terencio Verde is an independent apparel brand rooted in Central Texas, blending hometown culture, artist collaborations, Web3 and interactive clothing."
    },
    "/hometown.html": {
      title: "Hometown Collection | Terencio Verde",
      description: "Explore the Terencio Verde Hometown collection: apparel inspired by regional culture, Americana, music, local stories and the places that stay with us."
    },
    "/collaborations.html": {
      title: "Artist Collaborations | Terencio Verde",
      description: "Terencio Verde artist collaborations pair independent, emerging and international artists with limited-run apparel and visible artist credit."
    },
    "/web3.html": {
      title: "Web3 Collection | Terencio Verde",
      description: "Explore Terencio Verde Web3 projects, digital characters, NFT-inspired artwork, Cosmic Dream Bog and connected physical merchandise."
    },
    "/interactive.html": {
      title: "Interactive Apparel | Terencio Verde",
      description: "Discover Terencio Verde interactive apparel: physical clothing designed to connect with digital experiences and evolving creative projects."
    }
  };

  function upsertMeta(selector, attrs) {
    let node = document.head.querySelector(selector);
    if (!node) {
      node = document.createElement("meta");
      document.head.appendChild(node);
    }
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  }

  function addSeo() {
    const path = location.pathname || "/";
    const meta = pageMeta[path] || pageMeta["/"];
    const canonicalPath = path === "/index.html" ? "/" : path;
    const canonical = SITE + canonicalPath;

    document.title = meta.title;

    const description = document.head.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", meta.description);
    else upsertMeta('meta[name="description"]', { name: "description", content: meta.description });

    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "Terencio Verde" });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: meta.title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: meta.description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: SITE + "/assets/hero-hometown.png" });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: meta.title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: meta.description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: SITE + "/assets/hero-hometown.png" });

    if (!document.head.querySelector('script[data-tv-structured-data]')) {
      const ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.dataset.tvStructuredData = "true";
      ld.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Terencio Verde",
        url: SITE,
        description: pageMeta["/"].description,
        sameAs: []
      });
      document.head.appendChild(ld);
    }
  }

  function installResponsiveNavStyles() {
    if (document.getElementById("tv-responsive-nav-styles")) return;
    const style = document.createElement("style");
    style.id = "tv-responsive-nav-styles";
    style.textContent = `
      .tv-nav-toggle{display:none;align-items:center;justify-content:center;width:44px;height:44px;border:1px solid rgba(255,255,255,.22);background:transparent;color:inherit;border-radius:4px;font-size:0;line-height:1}
      .tv-nav-toggle span,.tv-nav-toggle::before,.tv-nav-toggle::after{content:"";display:block;width:20px;height:2px;background:currentColor;transition:transform .2s ease,opacity .2s ease}
      .tv-nav-toggle span{margin:4px 0}
      .tv-nav-toggle[aria-expanded="true"] span{opacity:0}
      .tv-nav-toggle[aria-expanded="true"]::before{transform:translateY(6px) rotate(45deg)}
      .tv-nav-toggle[aria-expanded="true"]::after{transform:translateY(-6px) rotate(-45deg)}
      .hero.hero-no-art{grid-template-columns:minmax(0,1040px)!important;justify-content:center;text-align:center}
      .hero.hero-no-art .hero-copy{margin-left:auto;margin-right:auto;max-width:1040px!important;width:100%;text-align:center}
      .hero.hero-no-art .hero-copy h1{max-width:980px;margin-left:auto;margin-right:auto;text-align:center;text-wrap:balance}
      .hero.hero-no-art .hero-copy p{margin-left:auto;margin-right:auto;text-align:center}
      .hero.hero-no-art .character-zone{display:none!important}
      @media(max-width:850px){
        header,.site-header{position:sticky!important;top:0}
        .tv-nav-toggle{display:inline-flex;flex-direction:column;flex-shrink:0}
        header>nav,.site-header>.site-nav{display:none!important;position:absolute!important;top:100%;left:0;right:0;z-index:1200;flex-direction:column!important;align-items:stretch!important;gap:0!important;padding:10px max(6%,env(safe-area-inset-right)) calc(14px + env(safe-area-inset-bottom)) max(6%,env(safe-area-inset-left));background:rgba(7,21,15,.98);border-top:1px solid rgba(255,255,255,.08);box-shadow:0 16px 32px rgba(0,0,0,.28)}
        header.tv-nav-open>nav,.site-header.tv-nav-open>.site-nav{display:flex!important}
        header>nav a,.site-header>.site-nav a{display:flex!important;align-items:center!important;min-height:48px!important;width:100%;padding:0 4px;font-size:.78rem!important;color:#f2eadb!important;opacity:.9!important;border-bottom:1px solid rgba(255,255,255,.07)}
        header>nav a:last-child,.site-header>.site-nav a:last-child{border-bottom:0}
      }
    `;
    document.head.appendChild(style);
  }

  function installWeb3Hero() {
    if (location.pathname !== "/web3.html") return;
    if (document.getElementById("tv-web3-hero-styles")) return;

    const hero = document.querySelector(".hero");
    if (!hero) return;
    hero.classList.add("tv-web3-hero");

    const style = document.createElement("style");
    style.id = "tv-web3-hero-styles";
    style.textContent = `
      .hero.tv-web3-hero,
      .hero.tv-web3-hero.hero-no-art {
        position:relative!important;
        min-height:88vh!important;
        display:grid!important;
        grid-template-columns:minmax(0,1.45fr) minmax(360px,.85fr)!important;
        align-items:center!important;
        gap:32px!important;
        padding:90px 6.5% 78px!important;
        background-image:linear-gradient(90deg,rgba(2,6,12,.05) 0%,rgba(2,6,12,.04) 48%,rgba(2,6,12,.46) 72%,rgba(2,6,12,.72) 100%),url("/assets/ChatGPT%20Image%20Sep%203%2C%202026%2C%2003_38_52%20PM.png")!important;
        background-size:cover!important;
        background-position:center center!important;
        background-repeat:no-repeat!important;
        text-align:left!important;
      }
      .hero.tv-web3-hero::before,
      .hero.tv-web3-hero::after { display:none!important; }
      .hero.tv-web3-hero .character-zone { display:none!important; }
      .hero.tv-web3-hero .hero-copy,
      .hero.tv-web3-hero.hero-no-art .hero-copy {
        grid-column:2!important;
        justify-self:end!important;
        align-self:center!important;
        width:100%!important;
        max-width:560px!important;
        margin:0!important;
        padding:0 0 0 10px!important;
        text-align:left!important;
        z-index:3!important;
      }
      .hero.tv-web3-hero .hero-copy .eyebrow {
        text-align:left!important;
        margin-left:0!important;
        margin-right:0!important;
        text-shadow:0 2px 12px rgba(0,0,0,.95);
      }
      .hero.tv-web3-hero .hero-copy h1,
      .hero.tv-web3-hero.hero-no-art .hero-copy h1 {
        max-width:560px!important;
        margin:0 0 22px!important;
        text-align:left!important;
        text-wrap:balance;
        font-size:clamp(3rem,4.35vw,5.4rem)!important;
        line-height:.94!important;
        text-shadow:0 3px 18px rgba(0,0,0,.95);
      }
      .hero.tv-web3-hero .hero-copy p,
      .hero.tv-web3-hero.hero-no-art .hero-copy p {
        max-width:520px!important;
        margin:0!important;
        text-align:left!important;
        color:rgba(255,255,255,.92)!important;
        text-shadow:0 2px 12px rgba(0,0,0,.95);
      }
      .tv-web3-photo-credit {
        position:absolute;
        left:6.5%;
        bottom:18px;
        z-index:5;
        margin:0;
        font-size:.68rem;
        letter-spacing:.02em;
        color:rgba(255,255,255,.72);
        text-shadow:0 1px 6px rgba(0,0,0,.95);
      }
      .tv-web3-photo-credit a {
        color:#77e3dc;
        text-decoration:underline;
        text-underline-offset:2px;
      }
      @media(max-width:1100px){
        .hero.tv-web3-hero,
        .hero.tv-web3-hero.hero-no-art {
          grid-template-columns:minmax(0,1.2fr) minmax(330px,.8fr)!important;
          background-position:46% center!important;
        }
        .hero.tv-web3-hero .hero-copy h1,
        .hero.tv-web3-hero.hero-no-art .hero-copy h1 {
          font-size:clamp(2.7rem,4.7vw,4.7rem)!important;
        }
      }
      @media(max-width:850px){
        .hero.tv-web3-hero,
        .hero.tv-web3-hero.hero-no-art {
          display:block!important;
          min-height:auto!important;
          padding:calc(58vh + 34px) 6% 72px!important;
          background-color:#050914!important;
          background-size:auto 58vh!important;
          background-position:center top!important;
          background-repeat:no-repeat!important;
          text-align:center!important;
        }
        .hero.tv-web3-hero .hero-copy,
        .hero.tv-web3-hero.hero-no-art .hero-copy {
          max-width:680px!important;
          margin:0 auto!important;
          padding:0!important;
          text-align:center!important;
        }
        .hero.tv-web3-hero .hero-copy .eyebrow,
        .hero.tv-web3-hero .hero-copy h1,
        .hero.tv-web3-hero.hero-no-art .hero-copy h1,
        .hero.tv-web3-hero .hero-copy p,
        .hero.tv-web3-hero.hero-no-art .hero-copy p {
          text-align:center!important;
          margin-left:auto!important;
          margin-right:auto!important;
        }
        .hero.tv-web3-hero .hero-copy h1,
        .hero.tv-web3-hero.hero-no-art .hero-copy h1 {
          font-size:clamp(2.5rem,11vw,4rem)!important;
        }
        .tv-web3-photo-credit {
          left:6%;
          right:6%;
          bottom:18px;
          text-align:center;
        }
      }
    `;
    document.head.appendChild(style);

    if (!hero.querySelector(".tv-web3-photo-credit")) {
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
  }

  function installWeb3CardArt() {
    if (location.pathname !== "/web3.html") return;
    if (document.getElementById("tv-web3-card-art")) return;

    const style = document.createElement("style");
    style.id = "tv-web3-card-art";
    style.textContent = `
      .merch-grid .merch-card:first-child,
      .merch-grid .merch-card:first-child:hover {
        background-color:#111827!important;
        background-image:url("/assets/geez-3426-Pose%2054-1788458747315.png")!important;
        background-size:cover!important;
        background-position:center!important;
        background-repeat:no-repeat!important;
      }
      .merch-grid .merch-card:first-child::before { display:none!important; }
      .merch-grid .merch-card:first-child h3,
      .merch-grid .merch-card:first-child p {
        z-index:2;
        text-shadow:0 2px 8px rgba(0,0,0,.9);
      }

      .merch-grid .merch-card:nth-child(2),
      .merch-grid .merch-card:nth-child(2):hover {
        background-color:#111827!important;
        background-image:url("/assets/Tee-02.png")!important;
        background-size:contain!important;
        background-position:center center!important;
        background-repeat:no-repeat!important;
      }
      .merch-grid .merch-card:nth-child(2)::before { display:none!important; }
      .merch-grid .merch-card:nth-child(2) h3,
      .merch-grid .merch-card:nth-child(2) p {
        z-index:2;
        text-shadow:0 2px 8px rgba(0,0,0,.9);
      }

      .merch-grid .merch-card:nth-child(3),
      .merch-grid .merch-card:nth-child(3):hover {
        background-color:#111827!important;
        background-image:url("/assets/ChatGPT%20Image%20Aug%2031%2C%202026%2C%2008_30_27%20AM%20%284%29.png")!important;
        background-size:contain!important;
        background-position:center center!important;
        background-repeat:no-repeat!important;
      }
      .merch-grid .merch-card:nth-child(3)::before { display:none!important; }
      .merch-grid .merch-card:nth-child(3) h3,
      .merch-grid .merch-card:nth-child(3) p {
        z-index:2;
        text-shadow:0 2px 8px rgba(0,0,0,.9);
      }
    `;
    document.head.appendChild(style);
  }

  function setupNavigation() {
    if (document.querySelector('script[src*="mobile-nav.js"]')) return;

    const header = document.querySelector("header, .site-header");
    if (!header) return;
    const nav = header.querySelector("nav, .site-nav");
    if (!nav) return;

    if (!nav.id) nav.id = "siteNavigation";

    let toggle = header.querySelector(".tv-nav-toggle");
    if (!toggle) {
      toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "tv-nav-toggle";
      toggle.setAttribute("aria-label", "Open navigation");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-controls", nav.id);
      toggle.innerHTML = "<span></span>";
      header.insertBefore(toggle, nav);
    }

    const closeNav = () => {
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

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeNav();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 850) closeNav();
    }, { passive: true });
  }

  function applyFeatureToggles() {
    const config = window.TERENCIO_CONFIG;
    document.querySelectorAll("#storeNav").forEach((node) => {
      node.style.display = config.storeEnabled ? "inline-flex" : "none";
    });
    document.querySelectorAll("#interactiveNav, #interactiveCard").forEach((node) => {
      if (config.interactiveApparelEnabled === false) node.style.display = "none";
    });
  }

  function removeEmptyHeroArtZones() {
    document.querySelectorAll(".character-zone").forEach((zone) => {
      if (!zone.querySelector("img, picture, video, svg")) {
        const hero = zone.closest(".hero");
        if (hero) hero.classList.add("hero-no-art");
      }
    });
  }

  addSeo();
  installResponsiveNavStyles();

  document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    applyFeatureToggles();
    removeEmptyHeroArtZones();
    installWeb3Hero();
    installWeb3CardArt();
  });
})();
