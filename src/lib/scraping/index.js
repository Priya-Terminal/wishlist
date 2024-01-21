import * as playwright from "playwright-aws-lambda";

import amazonScraper from "./amazon";

const getScraperProvider = (url) => {
  if (/www\.amazon\./.test(url)) {
    return amazonScraper;
  }
};

const scrapeData = async (url) => {
  const browser = await playwright.launchChromium({
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