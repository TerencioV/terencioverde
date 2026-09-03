/* =========================================================
   TERENCIO VERDE
   HOMEPAGE JAVASCRIPT
   ========================================================= */


document.addEventListener(
  "DOMContentLoaded",
  () => {


    /* =====================================================
       SITE CONFIG
       ===================================================== */

    const config =
      window.TERENCIO_CONFIG || {};


    /* =====================================================
       INTRO + FOOTER TEXT
       ===================================================== */

    const introTagline =
      document.getElementById(
        "introTagline"
      );


    const footerTagline =
      document.getElementById(
        "footerTagline"
      );


    if (introTagline) {

      introTagline.textContent =
        config.tagline ||
        "Independent Apparel · Art · Culture · Technology";

    }


    if (footerTagline) {

      footerTagline.textContent =
        config.tagline ||
        "Independent Apparel · Art · Culture · Technology";

    }


    /* =====================================================
       MUSIC INTRO
       ===================================================== */

    const intro =
      document.getElementById(
        "intro"
      );


    const audio =
      document.getElementById(
        "siteMusic"
      );


    const enterMusic =
      document.getElementById(
        "enterMusic"
      );


    const enterQuiet =
      document.getElementById(
        "enterQuiet"
      );


    const musicCredit =
      document.getElementById(
        "musicCredit"
      );


    const MUSIC_START =
      config.musicStart ?? 50;


    const MUSIC_END =
      config.musicEnd ?? 80;


    let musicWatcher = null;


    if (audio) {

      audio.src =
        config.musicFile ||
        "assets/do-you-remember.mp3";

    }


    if (musicCredit) {

      musicCredit.textContent =
        config.musicCredit ||
        "Music by Terence Green and the Loose Strings";

    }


    if (
      config.musicEnabled === false &&
      enterMusic
    ) {

      enterMusic.style.display =
        "none";

    }


    function closeIntro() {

      if (intro) {

        intro.classList.add(
          "hidden"
        );

      }

    }


    async function playMusic() {

      closeIntro();


      if (!audio) {

        return;

      }


      try {

        audio.currentTime =
          MUSIC_START;


        audio.volume =
          0.65;


        await audio.play();


        if (musicWatcher) {

          clearInterval(
            musicWatcher
          );

        }


        musicWatcher =
          setInterval(
            () => {


              if (
                audio.currentTime >=
                MUSIC_END
              ) {

                audio.pause();


                clearInterval(
                  musicWatcher
                );


                musicWatcher =
                  null;

              }


            },

            250
          );


      }

      catch (error) {

        console.log(
          "Music playback unavailable.",
          error
        );

      }

    }


    if (enterMusic) {

      enterMusic.addEventListener(
        "click",
        playMusic
      );

    }


    if (enterQuiet) {

      enterQuiet.addEventListener(
        "click",
        closeIntro
      );

    }


    /* =====================================================
       STORE NAV
       ===================================================== */

    const storeNav =
      document.getElementById(
        "storeNav"
      );


    if (
      config.storeEnabled === true &&
      storeNav
    ) {

      storeNav.style.display =
        "inline-flex";

    }


    /* =====================================================
       INTERACTIVE APPAREL
       ===================================================== */

    const interactiveNav =
      document.getElementById(
        "interactiveNav"
      );


    const interactiveCard =
      document.getElementById(
        "interactiveCard"
      );


    if (
      config.interactiveApparelEnabled === false
    ) {


      if (interactiveNav) {

        interactiveNav.style.display =
          "none";

      }


      if (interactiveCard) {

        interactiveCard.style.display =
          "none";

      }


    }


    /* =====================================================
       HOMEPAGE HERO CHARACTER
       ===================================================== */

    const homeHero =
      document.querySelector(
        ".home-hero"
      );


    const homeHeroInner =
      document.querySelector(
        ".home-hero-inner"
      );


    if (
      homeHero &&
      homeHeroInner &&
      !document.querySelector(
        ".home-hero-character"
      )
    ) {

      const heroCharacter =
        document.createElement(
          "img"
        );


      heroCharacter.className =
        "home-hero-character";


      heroCharacter.src =
        "/assets/terencio-hero.png";


      heroCharacter.alt =
        "Terencio presenting the Terencio Verde brand";


      heroCharacter.decoding =
        "async";


      heroCharacter.fetchPriority =
        "high";


      homeHeroInner.appendChild(
        heroCharacter
      );


      const heroCharacterStyles =
        document.createElement(
          "style"
        );


      heroCharacterStyles.textContent = `
        .home-hero-inner {
          min-height: inherit;
        }

        .home-hero-copy {
          position: relative;
          z-index: 3;
          max-width: min(760px, 58%);
        }

        .home-hero-character {
          position: absolute;
          z-index: 2;
          right: clamp(-70px, -2vw, -20px);
          bottom: -2px;
          width: clamp(470px, 43vw, 760px);
          max-width: 48vw;
          height: auto;
          object-fit: contain;
          object-position: bottom right;
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
          filter: drop-shadow(0 18px 24px rgba(0, 0, 0, .28));
        }

        @media (max-width: 1100px) {
          .home-hero-copy {
            max-width: 60%;
          }

          .home-hero-character {
            right: -90px;
            width: clamp(430px, 48vw, 620px);
            max-width: 50vw;
          }
        }

        @media (max-width: 760px) {
          .home-hero {
            align-items: flex-start;
          }

          .home-hero-inner {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            min-height: calc(100vh - 72px);
            padding-top: 72px;
            padding-bottom: 0;
          }

          .home-hero-copy {
            max-width: 100%;
            padding-bottom: 390px;
          }

          .home-hero-character {
            right: -68px;
            bottom: -8px;
            width: min(520px, 92vw);
            max-width: none;
          }
        }

        @media (max-width: 480px) {
          .home-hero-copy {
            padding-bottom: 330px;
          }

          .home-hero-character {
            right: -72px;
            width: 440px;
          }
        }
      `;


      document.head.appendChild(
        heroCharacterStyles
      );

    }


    /* =====================================================
       FOOTER YEAR
       ===================================================== */

    const footerYear =
      document.getElementById(
        "footerYear"
      );


    if (footerYear) {

      footerYear.textContent =
        new Date().getFullYear();

    }


  }
);
