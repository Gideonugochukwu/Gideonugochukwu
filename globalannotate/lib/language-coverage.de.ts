// German language-coverage data for /de/languages. Mirrors
// lib/language-coverage.ts: the same 16 African specialist languages and the
// same regional lists, with German names, regions, approximate speaker
// counts (first and second language), and the services available.

export const DE_SERVICE_TAGS = [
  "Übersetzung",
  "MTPE",
  "KI-Datenannotation",
  "MarketReady™",
  "Untertitelung",
];

export type DeAfricanLanguage = {
  name: string;
  keyword?: string; // the Google.de target for this language, if any
  countries: string;
  speakers: string;
  script: string;
};

export const africanLanguagesDe: DeAfricanLanguage[] = [
  { name: "Hausa", keyword: "Übersetzung Hausa", countries: "Nigeria, Niger, Ghana, Kamerun", speakers: "80 Mio.+", script: "Lateinische Schrift" },
  { name: "Yoruba", keyword: "Übersetzung Yoruba", countries: "Nigeria, Benin, Togo", speakers: "47 Mio.+", script: "Lateinische Schrift" },
  { name: "Igbo", keyword: "Übersetzung Igbo", countries: "Nigeria", speakers: "45 Mio.+", script: "Lateinische Schrift" },
  { name: "Wolof", keyword: "Übersetzung Wolof", countries: "Senegal, Gambia, Mauretanien", speakers: "12 Mio.+", script: "Lateinische Schrift" },
  { name: "Amharisch", keyword: "Übersetzung Amharisch", countries: "Äthiopien", speakers: "57 Mio.+", script: "Ge’ez-Schrift" },
  { name: "Swahili", keyword: "Übersetzung Swahili", countries: "Kenia, Tansania, Uganda, DR Kongo", speakers: "200 Mio.+", script: "Lateinische Schrift" },
  { name: "Somali", keyword: "Übersetzung Somali", countries: "Somalia, Dschibuti, Äthiopien, Kenia", speakers: "22 Mio.+", script: "Lateinische Schrift" },
  { name: "Zulu", keyword: "Übersetzung Zulu", countries: "Südafrika, Lesotho", speakers: "27 Mio.+", script: "Lateinische Schrift" },
  { name: "Shona", countries: "Simbabwe, Mosambik", speakers: "12 Mio.+", script: "Lateinische Schrift" },
  { name: "Twi", countries: "Ghana", speakers: "18 Mio.+", script: "Lateinische Schrift" },
  { name: "Ful (Fulfulde)", countries: "Westafrika", speakers: "40 Mio.+", script: "Lateinische Schrift / Adlam" },
  { name: "Tigrinya", countries: "Eritrea, Äthiopien", speakers: "9 Mio.+", script: "Ge’ez-Schrift" },
  { name: "Oromo", countries: "Äthiopien, Kenia", speakers: "37 Mio.+", script: "Lateinische Schrift" },
  { name: "Kinyarwanda", countries: "Ruanda, DR Kongo", speakers: "12 Mio.+", script: "Lateinische Schrift" },
  { name: "Lingala", countries: "DR Kongo, Republik Kongo", speakers: "25 Mio.+", script: "Lateinische Schrift" },
  { name: "Madagassisch", countries: "Madagaskar", speakers: "25 Mio.+", script: "Lateinische Schrift" },
];

export type DeLanguageRow = { name: string; regions: string; speakers: string };
export type DeLanguageGroup = { region: string; blurb: string; languages: DeLanguageRow[] };

export const regionalGroupsDe: DeLanguageGroup[] = [
  {
    region: "Europäische Sprachen",
    blurb: "Vollständige Abdeckung West-, Nord-, Mittel- und Osteuropas sowie des Kaukasus.",
    languages: [
      { name: "Französisch", regions: "Frankreich, Belgien, Schweiz, Kanada, West- und Zentralafrika", speakers: "ca. 300 Mio." },
      { name: "Deutsch", regions: "Deutschland, Österreich, Schweiz", speakers: "ca. 130 Mio." },
      { name: "Spanisch", regions: "Spanien, Lateinamerika, USA", speakers: "ca. 560 Mio." },
      { name: "Portugiesisch", regions: "Portugal, Brasilien, Angola, Mosambik", speakers: "ca. 260 Mio." },
      { name: "Italienisch", regions: "Italien, Schweiz", speakers: "ca. 68 Mio." },
      { name: "Niederländisch", regions: "Niederlande, Belgien", speakers: "ca. 25 Mio." },
      { name: "Dänisch", regions: "Dänemark", speakers: "ca. 6 Mio." },
      { name: "Schwedisch", regions: "Schweden, Finnland", speakers: "ca. 13 Mio." },
      { name: "Norwegisch", regions: "Norwegen", speakers: "ca. 5 Mio." },
      { name: "Finnisch", regions: "Finnland", speakers: "ca. 5,5 Mio." },
      { name: "Polnisch", regions: "Polen", speakers: "ca. 40 Mio." },
      { name: "Rumänisch", regions: "Rumänien, Moldau", speakers: "ca. 24 Mio." },
      { name: "Russisch", regions: "Russland, Zentralasien, Osteuropa", speakers: "ca. 250 Mio." },
      { name: "Ukrainisch", regions: "Ukraine", speakers: "ca. 35 Mio." },
      { name: "Griechisch", regions: "Griechenland, Zypern", speakers: "ca. 13 Mio." },
      { name: "Tschechisch", regions: "Tschechien", speakers: "ca. 11 Mio." },
      { name: "Ungarisch", regions: "Ungarn", speakers: "ca. 13 Mio." },
      { name: "Kroatisch", regions: "Kroatien, Bosnien und Herzegowina", speakers: "ca. 5,5 Mio." },
      { name: "Serbisch", regions: "Serbien, Bosnien und Herzegowina, Montenegro", speakers: "ca. 10 Mio." },
      { name: "Bulgarisch", regions: "Bulgarien", speakers: "ca. 8 Mio." },
      { name: "Slowakisch", regions: "Slowakei", speakers: "ca. 5 Mio." },
      { name: "Slowenisch", regions: "Slowenien", speakers: "ca. 2,5 Mio." },
      { name: "Litauisch", regions: "Litauen", speakers: "ca. 3 Mio." },
      { name: "Lettisch", regions: "Lettland", speakers: "ca. 2 Mio." },
      { name: "Estnisch", regions: "Estland", speakers: "ca. 1,1 Mio." },
      { name: "Armenisch", regions: "Armenien", speakers: "ca. 6 Mio." },
      { name: "Georgisch", regions: "Georgien", speakers: "ca. 4 Mio." },
      { name: "Katalanisch", regions: "Katalonien (Spanien), Andorra", speakers: "ca. 10 Mio." },
      { name: "Baskisch", regions: "Baskenland (Spanien und Frankreich)", speakers: "ca. 750.000" },
      { name: "Galicisch", regions: "Galicien (Spanien)", speakers: "ca. 2,4 Mio." },
      { name: "Isländisch", regions: "Island", speakers: "ca. 350.000" },
      { name: "Irisch", regions: "Irland", speakers: "ca. 1,7 Mio." },
      { name: "Walisisch", regions: "Wales (Vereinigtes Königreich)", speakers: "ca. 900.000" },
      { name: "Maltesisch", regions: "Malta", speakers: "ca. 520.000" },
    ],
  },
  {
    region: "Asiatische Sprachen",
    blurb: "Ost-, Süd- und Südostasien – von Chinesisch, Japanisch und Koreanisch bis zu den großen Sprachen Indiens und Südostasiens.",
    languages: [
      { name: "Japanisch", regions: "Japan", speakers: "ca. 120 Mio." },
      { name: "Koreanisch", regions: "Südkorea, Nordkorea", speakers: "ca. 80 Mio." },
      { name: "Chinesisch (vereinfacht)", regions: "Festlandchina, Singapur, Malaysia", speakers: "ca. 1,1 Mrd." },
      { name: "Chinesisch (traditionell)", regions: "Taiwan, Hongkong, Macau", speakers: "ca. 30 Mio." },
      { name: "Hindi", regions: "Indien", speakers: "ca. 600 Mio." },
      { name: "Urdu", regions: "Pakistan, Indien", speakers: "ca. 230 Mio." },
      { name: "Bengalisch", regions: "Bangladesch, Indien", speakers: "ca. 270 Mio." },
      { name: "Tamil", regions: "Indien, Sri Lanka, Singapur", speakers: "ca. 85 Mio." },
      { name: "Telugu", regions: "Indien", speakers: "ca. 95 Mio." },
      { name: "Marathi", regions: "Indien", speakers: "ca. 99 Mio." },
      { name: "Gujarati", regions: "Indien", speakers: "ca. 60 Mio." },
      { name: "Kannada", regions: "Indien", speakers: "ca. 59 Mio." },
      { name: "Malayalam", regions: "Indien", speakers: "ca. 38 Mio." },
      { name: "Panjabi", regions: "Pakistan, Indien", speakers: "ca. 150 Mio." },
      { name: "Thailändisch", regions: "Thailand", speakers: "ca. 70 Mio." },
      { name: "Vietnamesisch", regions: "Vietnam", speakers: "ca. 85 Mio." },
      { name: "Indonesisch", regions: "Indonesien", speakers: "ca. 250 Mio." },
      { name: "Malaiisch", regions: "Malaysia, Brunei, Singapur", speakers: "ca. 30 Mio." },
      { name: "Tagalog", regions: "Philippinen", speakers: "ca. 80 Mio." },
      { name: "Mongolisch", regions: "Mongolei", speakers: "ca. 5,2 Mio." },
      { name: "Birmanisch", regions: "Myanmar", speakers: "ca. 43 Mio." },
      { name: "Khmer", regions: "Kambodscha", speakers: "ca. 18 Mio." },
      { name: "Laotisch", regions: "Laos", speakers: "ca. 30 Mio." },
      { name: "Nepali", regions: "Nepal, Indien", speakers: "ca. 32 Mio." },
      { name: "Singhalesisch", regions: "Sri Lanka", speakers: "ca. 17 Mio." },
    ],
  },
  {
    region: "Sprachen des Nahen Ostens",
    blurb: "Modernes Hocharabisch und regionale Dialekte sowie weitere Sprachen der Region.",
    languages: [
      { name: "Arabisch (Hocharabisch und Dialekte)", regions: "Naher Osten, Nordafrika", speakers: "ca. 370 Mio." },
      { name: "Hebräisch", regions: "Israel", speakers: "ca. 9 Mio." },
      { name: "Persisch (Farsi)", regions: "Iran, Afghanistan, Tadschikistan", speakers: "ca. 110 Mio." },
      { name: "Türkisch", regions: "Türkei, Zypern", speakers: "ca. 88 Mio." },
      { name: "Kurdisch", regions: "Irak, Türkei, Iran, Syrien", speakers: "ca. 30 Mio." },
      { name: "Paschtu", regions: "Afghanistan, Pakistan", speakers: "ca. 45 Mio." },
      { name: "Dari", regions: "Afghanistan", speakers: "ca. 20 Mio." },
    ],
  },
  {
    region: "Zentralasiatische und kaukasische Sprachen",
    blurb: "Turksprachen und persische Sprachen in Zentralasien und im Kaukasus.",
    languages: [
      { name: "Kasachisch", regions: "Kasachstan", speakers: "ca. 16 Mio." },
      { name: "Usbekisch", regions: "Usbekistan", speakers: "ca. 44 Mio." },
      { name: "Tadschikisch", regions: "Tadschikistan", speakers: "ca. 9 Mio." },
      { name: "Kirgisisch", regions: "Kirgisistan", speakers: "ca. 5 Mio." },
      { name: "Turkmenisch", regions: "Turkmenistan", speakers: "ca. 7 Mio." },
      { name: "Aserbaidschanisch", regions: "Aserbaidschan, Iran", speakers: "ca. 24 Mio." },
    ],
  },
];

export const servicesEveryLanguageDe: string[] = [
  "Übersetzung",
  "Maschinelle Übersetzung mit anschließender Nachbearbeitung (MTPE)",
  "KI-Datenannotation",
  "MarketReady™ kulturelle Validierung",
  "Spielelokalisierung",
  "Untertitelung",
  "Transkription",
];
