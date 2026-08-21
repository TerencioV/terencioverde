
/*
  ==========================================================
  TERENCIO VERDE MOBILE NAVIGATION
  ==========================================================

  This creates a reusable mobile menu for iPhone and Android.

  It automatically copies the links from the normal desktop
  navigation on each page.

  No extra menu HTML is required.
*/


document.addEventListener("DOMContentLoaded", () => {

  const header =
    document.querySelector("header");

  const desktopNav =
    header?.querySelector("nav");


  if (!header || !desktopNav) {
    return;
  }


  /*
    ========================================================
    MOBILE STYLES
    ========================================================
  */

  const style =
    document.createElement("style");


  style.textContent = `

    /*
      Make room for iPhone notch / safe areas.
    */

    header {
      padding-left:
        max(6%, env(safe-area-inset-left));

      padding-right:
        max(6%, env(safe-area-inset-right));
    }


    .tv-mobile-menu-button {
      display: none;

      width: 48px;
      height: 48px;

      padding: 0;

      border: 0;
      border-radius: 5px;

      background:
        rgba(255,255,255,0.08);

      color: white;

      cursor: pointer;

      align-items: center;
      justify-content: center;

      flex-direction: column;

      gap: 5px;

      -webkit-tap-highlight-color:
        transparent;
    }


    .tv-mobile-menu-button span {
      display: block;

      width: 23px;
      height: 2px;

      background: currentColor;

      border-radius: 10px;

      transition:
        transform 0.25s ease,
        opacity 0.25s ease;
    }


    .tv-mobile-menu-button.open
    span:nth-child(1) {
      transform:
        translateY(7px)
        rotate(45deg);
    }


    .tv-mobile-menu-button.open
    span:nth-child(2) {
      opacity: 0;
    }


    .tv-mobile-menu-button.open
    span:nth-child(3) {
      transform:
        translateY(-7px)
        rotate(-45deg);
    }


    .tv-mobile-menu {
      position: fixed;

      top: 0;
      right: 0;

      z-index: 5000;

      width:
        min(360px, 88vw);

      height: 100dvh;

      padding:
        calc(
          90px +
          env(safe-area-inset-top)
        )
        28px
        calc(
          35px +
          env(safe-area-inset-bottom)
        );

      background:
        #102d22;

      color: white;

      transform:
        translateX(105%);

      transition:
        transform 0.3s ease;

      box-shadow:
        -20px 0 60px
        rgba(0,0,0,0.35);

      overflow-y: auto;

      -webkit-overflow-scrolling:
        touch;
    }


    .tv-mobile-menu.open {
      transform:
        translateX(0);
    }


    .tv-mobile-menu nav {
      display: flex !important;

      flex-direction: column;

      align-items: stretch;

      gap: 4px;
    }


    .tv-mobile-menu nav a {
      display: block;

      width: 100%;

      padding:
        17px 4px;

      border-bottom:
        1px solid
        rgba(255,255,255,0.12);

      color: white;

      font-size: 1rem;

      line-height: 1.4;

      letter-spacing:
        0.06rem;

      text-decoration: none;

      opacity: 1;

      /*
        Comfortable mobile touch target.
      */

      min-height: 52px;

      -webkit-tap-highlight-color:
        transparent;
    }


    .tv-mobile-menu-title {
      margin-bottom: 25px;

      font-family:
        Georgia,
        "Times New Roman",
        serif;

      font-size: 1.35rem;

      letter-spacing:
        0.12rem;
    }


    .tv-mobile-overlay {
      position: fixed;

      inset: 0;

      z-index: 4999;

      background:
        rgba(0,0,0,0.55);

      opacity: 0;

      visibility: hidden;

      transition:
        opacity 0.3s ease,
        visibility 0.3s ease;
    }


    .tv-mobile-overlay.open {
      opacity: 1;
      visibility: visible;
    }


    body.tv-menu-open {
      overflow: hidden;
      touch-action: none;
    }


    @media
    (max-width: 850px) {

      /*
        Hide desktop navigation.
      */

      header > nav {
        display: none !important;
      }


      /*
        Show mobile menu button.
      */

      .tv-mobile-menu-button {
        display: flex;
      }


      /*
        Keep header usable on small phones.
      */

      header {
        min-height: 64px;
      }


      header .brand,
      header > a:first-child {
        max-width: calc(100% - 70px);

        white-space: nowrap;

        overflow: hidden;

        text-overflow: ellipsis;
      }

    }


    /*
      Landscape phones.
    */

    @media
    (max-height: 500px)
    and
    (orientation: landscape) {

      .tv-mobile-menu {
        padding-top: 65px;
      }


      .tv-mobile-menu nav a {
        padding:
          11px 4px;

        min-height:
          44px;
      }

    }

  `;


  document.head.appendChild(style);


  /*
    ========================================================
    MENU BUTTON
    ========================================================
  */

  const menuButton =
    document.createElement("button");


  menuButton.className =
    "tv-mobile-menu-button";


  menuButton.type =
    "button";


  menuButton.setAttribute(
    "aria-label",
    "Open navigation"
  );


  menuButton.setAttribute(
    "aria-expanded",
    "false"
  );


  menuButton.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;


  header.appendChild(
    menuButton
  );


  /*
    ========================================================
    OVERLAY
    ========================================================
  */

  const overlay =
    document.createElement("div");


  overlay.className =
    "tv-mobile-overlay";


  document.body.appendChild(
    overlay
  );


  /*
    ========================================================
    MOBILE MENU
    ========================================================
  */

  const mobileMenu =
    document.createElement("aside");


  mobileMenu.className =
    "tv-mobile-menu";


  mobileMenu.setAttribute(
    "aria-hidden",
    "true"
  );


  /*
    Copy desktop navigation links.

    That means when we change navigation later,
    the mobile menu automatically follows it.
  */

  const copiedNav =
    desktopNav.cloneNode(true);


  const title =
    document.createElement("div");


  title.className =
    "tv-mobile-menu-title";


  title.textContent =
    "TERENCIO VERDE";


  mobileMenu.appendChild(
    title
  );


  mobileMenu.appendChild(
    copiedNav
  );


  document.body.appendChild(
    mobileMenu
  );


  /*
    ========================================================
    OPEN / CLOSE FUNCTIONS
    ========================================================
  */

  function openMenu() {

    menuButton.classList.add(
      "open"
    );


    mobileMenu.classList.add(
      "open"
    );


    overlay.classList.add(
      "open"
    );


    document.body.classList.add(
      "tv-menu-open"
    );


    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );


    menuButton.setAttribute(
      "aria-label",
      "Close navigation"
    );


    mobileMenu.setAttribute(
      "aria-hidden",
      "false"
    );

  }


  function closeMenu() {

    menuButton.classList.remove(
      "open"
    );


    mobileMenu.classList.remove(
      "open"
    );


    overlay.classList.remove(
      "open"
    );


    document.body.classList.remove(
      "tv-menu-open"
    );


    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );


    menuButton.setAttribute(
      "aria-label",
      "Open navigation"
    );


    mobileMenu.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  /*
    ========================================================
    EVENTS
    ========================================================
  */

  menuButton.addEventListener(
    "click",
    () => {

      if (
        mobileMenu.classList.contains(
          "open"
        )
      ) {

        closeMenu();

      }

      else {

        openMenu();

      }

    }
  );


  overlay.addEventListener(
    "click",
    closeMenu
  );


  /*
    Close when somebody selects a page.
  */

  copiedNav
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        closeMenu
      );

    });


  /*
    ESC key support.
  */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeMenu();

      }

    }
  );


  /*
    If phone rotates or browser grows
    back to desktop size, reset menu.
  */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 850
      ) {

        closeMenu();

      }

    }
  );

});
