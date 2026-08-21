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
