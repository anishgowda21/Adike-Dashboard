export const BRANCHES = [
  "SHIMOGA",
  "SAGARA",
  "HOSANAGARA",
  "THIRTHAHALLI",
  "KOPPA",
  "SRINGERI",
  "BIRUR",
  "CHANNAGIRI",
  "BHADRAVATHI",
  "TARIKERE",
  "SHIKARIPURA",
  "SORABA BRANCH",
  "DP KOTE ROAD",
];

export const MAMCOS_URL = process.env.NEXT_PUBLIC_MAMCOS_URL || "";

if (!MAMCOS_URL) {
  console.error("MAMCOS_URL is not defined in environment variables");
}
