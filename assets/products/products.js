/*
  ==========================================================
  TERENCIO VERDE PRODUCT CATALOG
  ==========================================================

  This file is the product database for the website.

  Later, when you want to add a shirt, you'll mostly work
  in THIS file instead of editing the store HTML.

  Images go in:
  assets/products/

  Example:
  assets/products/hometown-river-shirt.jpg
*/


window.TERENCIO_PRODUCTS = [

  /*
    ========================================================
    HOMETOWN
    ========================================================
  */

  {
    id: "tv-hometown-001",

    name: "Terencio Verde Hometown Tee",

    slug: "terencio-verde-hometown-tee",

    collection: "Hometown",

    category: "T-Shirt",

    price: 30.00,

    image:
      "assets/products/hometown-tee.jpg",

    images: [
      "assets/products/hometown-tee.jpg"
    ],

    description:
      "A Terencio Verde hometown-inspired graphic tee.",

    sizes: [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],

    featured: true,

    active: false,

    nfcEnabled: true
  },


  /*
    ========================================================
    TERENCIO VERDE ORIGINALS
    ========================================================
  */

  {
    id: "tv-original-001",

    name: "Terencio Verde Original Tee",

    slug: "terencio-verde-original-tee",

    collection: "Originals",

    category: "T-Shirt",

    price: 32.00,

    image:
      "assets/products/terencio-original.jpg",

    images: [
      "assets/products/terencio-original.jpg"
    ],

    description:
      "An original Terencio Verde character design.",

    sizes: [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],

    featured: true,

    active: false,

    nfcEnabled: true
  },


  /*
    ========================================================
    ARTIST COLLABORATIONS
    ========================================================
  */

  {
    id: "tv-collab-001",

    name: "Artist Collaboration No. 1",

    slug: "artist-collaboration-001",

    collection: "Artist Collaborations",

    category: "T-Shirt",

    price: 38.00,

    image:
      "assets/products/artist-collab-001.jpg",

    images: [
      "assets/products/artist-collab-001.jpg"
    ],

    description:
      "A limited Terencio Verde collaboration with an independent artist.",

    artist: "Artist name coming soon",

    artistLink: "",

    sizes: [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],

    featured: false,

    active: false,

    nfcEnabled: true
  },


  /*
    ========================================================
    WEB3 / MARIA VERDE
    ========================================================
  */

  {
    id: "tv-web3-001",

    name: "Maria Verde Web3 Tee",

    slug: "maria-verde-web3-tee",

    collection: "Web3",

    category: "T-Shirt",

    price: 36.00,

    image:
      "assets/products/maria-web3.jpg",

    images: [
      "assets/products/maria-web3.jpg"
    ],

    description:
      "Maria Verde from the digital side of the Terencio Verde universe.",

    sizes: [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],

    featured: true,

    active: false,

    nfcEnabled: true
  }

];
