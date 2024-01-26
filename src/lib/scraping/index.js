import puppeteer from "puppeteer-core";

import amazonScraper from "./amazon";

const getScraperProvider = (url) => {
  if (/www\.amazon\./.test(url)) {
    return amazonScraper;
  }
};

const scrapeData = async (url) => {
  const browser = await puppeteer.connect({
    browserWSEndpoint: process.env.PUPPETEER_WS_ENDPOINT,
    headless: true, // Set headless mode to true
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // Reduce resource usage
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url);
  
  const scraper = getScraperProvider(url);
  const scrapedData = await scraper(page);

  await browser.close();
  return scrapedData;
};

export default scrapeData;