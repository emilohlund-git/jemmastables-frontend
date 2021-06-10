const navButtons = [
  {
    label: "Startsida",
    path: "/",
  },
  {
    label: "Anläggningen",
    path: `/anläggningen`,
    dropdown: true,
    route: "anläggningen"
  },
  {
    label: "Hästar",
    path: `/hästar`,
    dropdown: true,
    route: "hästar"
  },
  {
    label: "Kontakta Oss",
    path: "/kontakta-oss",
  },
  {
    label: "Bokning av ridbana",
    path: "/bokning-av-ridbana",
  },
  {
    label: "Samarbetspartners",
    path: "/samarbetspartners",
  },
];

export default navButtons;
