import { cleanString } from "./utils";

/**
 * @param {import("puppeteer-core").Page} page
 * 
 * @returns {Promise<{title: string, description: string, image: string, price: string}>}
 */
const amazonScraper = async (page) => {
  let title, description, image, price;

  try {
    title = await page.$eval("#productTitle", (el) => {
      console.log(el);
      return el.textContent
    });
  } catch (e) {
    console.warn("Failed to scrape title");
    console.log(e);
  }

  // try {
  //   title = await page.$eval("#productTitle", (el) => el.textContent);
  //   title = cleanString(title);
  // } catch (e) {
  //   // no-op we just ignore
  // }

  // try {
  //   description = await page.$eval("#feature-bullets", (el) => el.textContent);
  //   description = cleanString(description);
  // } catch (e) {
  //   // no-op we just ignore
  // }

  // try {
  //   image = await page.$eval("#imgTagWrapperId img", (el) => el.src);
  // } catch (e) {
  //   // no-op we just ignore
  // }

  // try {
  //   price = await page.$eval("#priceblock_ourprice", (el) => el.textContent);
  //   price = cleanString(price);
  // } catch (e) {
  //   // no-op we just ignore
  // }

  return { title, description, image, price };
};

export default amazonScraper;
