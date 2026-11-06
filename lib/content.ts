/**
 * Facts to confirm with the client before launch are marked CONFIRM.
 */
export const company = {
  name: "AKS Chemicals",
  tagline: "Manufacturer of textile chemicals",
  city: "Lahore, Pakistan",
  founded: 1987,
  /** Public site address (live domain, www redirects here). Used for metadata, sitemap and social previews. */
  siteUrl: "https://akschemicals.com",
  address: ["544 A Faisal Town", "Lahore, Pakistan"],
  addressShort: "544 A Faisal Town, Lahore",
  phones: ["+92 42 35236670", "+92 42 35236671"],
  /** CONFIRM: one digit shorter than the phone numbers, may be meant to read +92 42 35236672. */
  fax: "+92 42 5236672",
  email: "info@akschemicals.com",
};

/** One line used in the page metadata and the footer. */
export const summary = `Manufacturer and supplier of textile chemicals. ${company.city}, since ${company.founded}.`;

/**
 * CONFIRM: ISO 9001:2008 was withdrawn and its certificates expired in September 2018.
 * Replace with the client's current certificate (most likely ISO 9001:2015).
 */
export const iso = { standard: "ISO 9001", edition: "2008" };
export const isoFull = `${iso.standard}:${iso.edition}`;

export const capabilities = [
  { label: "Wet process", value: "Pretreatment, dyeing auxiliaries, finishes" },
  { label: "Garment", value: "Denim washing and special finishing" },
  { label: "Contract", value: "Confidential toll manufacturing" },
  { label: "Other markets", value: "Tissue, wet wipes, cleaning" },
];

export const ranges = [
  {
    n: "01",
    name: "Pretreatment",
    blurb: "Getting the cloth clean, even and absorbent before any colour goes near it.",
  },
  {
    n: "02",
    name: "Dyeing Auxiliaries",
    blurb: "Chemistry that makes a dyebath behave, so the shade is right first time and holds across the batch.",
  },
  {
    n: "03",
    name: "Finishes",
    blurb: "The handle, the drape and the way a fabric feels when a buyer picks it up.",
  },
  {
    n: "04",
    name: "Denim Washing",
    blurb: "An honest wash-down without wrecking the strength of the garment.",
  },
  {
    n: "05",
    name: "Special Finishing",
    blurb: "Water repellents, oil repellents and flame retardants, for cloth that has to do a job.",
  },
];

export const figures = [
  { value: String(company.founded), label: ["Established", "Lahore"] },
  { value: String(ranges.length).padStart(2, "0"), label: ["Chemical", "ranges"] },
  { value: "ISO", label: [`${iso.standard.replace("ISO ", "")}:${iso.edition}`, "registered"] },
  { value: "REACH", label: ["Compliance", "programme"] },
  { value: "Toll", label: ["Contract", "manufacturing"] },
];

export const otherMarkets = [
  { k: "Tissue", title: "Tissue manufacture", body: "Chemistry supplied to the tissue industry alongside the textile ranges." },
  { k: "Wet wipes", title: "Wet wipe industry", body: "Formulations developed for wet wipe producers." },
  { k: "Cleaning", title: "Cleaning industry", body: "Chemicals for cleaning product manufacture, made on the same plant." },
];

export const standards = [
  { k: "Quality management", title: isoFull, body: `AKS Chemicals holds registration to ${isoFull} for its quality management system.` },
  { k: "Chemical regulation", title: "REACH compliance", body: "A REACH compliance programme covering the substances supplied into European supply chains." },
];

export const nav = [
  { href: "#about", label: "Who we are" },
  { href: "#ranges", label: "What we do" },
  { href: "#toll", label: "Toll manufacturing" },
  { href: "#compliance", label: "Compliance" },
];

/**
 * Every photograph on the page. Swap `src` for the client's own shot and keep
 * the dimensions, or update both: nothing else needs to change.
 */
export const shots = {
  production: { src: "/img/p-production.jpg", w: 1600, h: 686, alt: "Textile finishing range, dye house floor" },
  laboratory: { src: "/img/p-laboratory.jpg", w: 800, h: 1000, alt: "Quality control laboratory, beaker of liquor" },
  finishing: { src: "/img/p-finishing.jpg", w: 800, h: 550, alt: "Loom running finished cloth" },
  plant: { src: "/img/p-plant.jpg", w: 800, h: 1000, alt: "Process vessels on the plant floor" },
};
