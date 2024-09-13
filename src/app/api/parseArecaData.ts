import * as cheerio from "cheerio";
import { ArecaData, dailyData, Product } from "./types";

const parseArecaData = (htmlContent: string): ArecaData => {
  const $ = cheerio.load(htmlContent);
  const tableRows = $("tbody tr");
  let data: ArecaData = [];
  let currentDate = "";
  let currentLocation = "";

  tableRows.each((index, row) => {
    const tds = $(row).find("td");
    const ths = $(row).find("th");
    if (ths.length > 0) {
      const headerText = ths.text().trim();
      const [date, location] = headerText.split(" / ");
      currentDate = date.trim();
      currentLocation = location.trim();
      data.push({
        date: currentDate,
        location: currentLocation,
        products: [],
      });
    } else if (tds.length > 0) {
      const product: Product = {
        name: tds.eq(0).text().trim(),
        minRate: parseInt(tds.eq(1).text().trim()),
        maxRate: parseInt(tds.eq(2).text().trim()),
        modelRate: parseInt(tds.eq(3).text().trim()),
      };
      data[data.length - 1].products.push(product);
    }
  });

  return data;
};

export default parseArecaData;
