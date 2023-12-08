import { cleanString } from "./utils";

const amazonScraper = async (page) => {
  let title, description, image;

  try {
    title = await page.locator("#productTitle").allTextContents();
    title = cleanString(title.join(" "));
  } catch (e) {
    // no-op we just ignore
  }

  try {
    description = await page.locator("#feature-bullets").allTextContents();
    description = cleanString(description.join(" "));
  } catch (e) {
    // no-op we just ignore
  }

  try {
    image = await page.locator("#imgTagWrapperId img").getAttribute("src");
  } catch (e) {
    // no-op we just ignore
  }

  return { title, description, image };
};

export default amazonScraper;
