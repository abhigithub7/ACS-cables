// categoryData.js


import mobile from "./assets/cabels.webp";
import lan from "./assets/lan cables.jpg";
import cctv from "./assets/cctv-cables.webp";
import power from "./assets/printer.jpg";
import printer from "./assets/printer-cables.jpg";
import indoor from "./assets/indoor-cables-2.jpg";
import outdoor from "./assets/outdoor-cables.webp";
import accessories from "./assets/assessories.jpg";

export const categories = [
  {
    name: "Mobile Data Cables",
    image: mobile,
  },
  {
    name: "LAN Cables (CAT5 / CAT6)",
    image: lan,
  },
  {
    name: "CCTV Cables",
    image: cctv,
  },
  {
    name: "Printers",
    image: power,
  },
  {
    name: "Printer Cables",
    image: printer,
  },
  {
    name: "Indoor Cables",
    image: indoor,
  },
  {
    name: "Outdoor",
    image: outdoor,
  },
  {
    name: "Accessories",
    image: accessories,
  },
];