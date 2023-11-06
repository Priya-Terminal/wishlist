import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose'; 
import { findByIdAndUpdate } from '@/models/wishlistitem';
import { launchChromium } from 'playwright-aws-lambda';

const scrapeData = async (url) => {
  const browser = await launchChromium();

  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36');

  await page.goto(url);
  
  try {
    const scrapedData = {
      title: await page.$eval('meta[property="og:title"]', (element) => element.getAttribute('content')),
      description: await page.$eval('meta[property="og:description"]', (element) => element.getAttribute('content')),
      image: await page.$eval('meta[property="og:image"]', (element) => element.getAttribute('content')),
    };
  
    if (!scrapedData.title || scrapedData.title.trim() === '') {
      scrapedData.title = 'Title Not Found';
    }

    if (!scrapedData.description || scrapedData.description.trim() === '') {
      scrapedData.description = 'Description Not Found';
    }
  
    if (!scrapedData.image || scrapedData.image.trim() === '') {
      scrapedData.image = 'https://i.imgur.com/Ki1kaw4.png'; 
    }
  
    await browser.close();
    return scrapedData;
  } catch (error) {
    console.error("Error scraping data for URL:", url, error);
    await browser.close();
    return {
      title: 'Title Not Found',
      description: 'Description Not Found',
      image: 'https://i.imgur.com/Ki1kaw4.png', 
    }; 
  }
};
export { scrapeData };

export default async (req, res) => {
  try {
    const userId = req.query.userId || req.body.userId;
    console.log("Enrichment process initiated for user:", userId);

    const userWishlistItems = await mongoose.model('WishlistItem').find({ userId }); 
    console.log(`Found ${userWishlistItems.length} items for user ${userId}`);

    let enrichedItemCount = 0; 
    let erroredItemCount = 0; 
    const enrichedItems = []; 
    const processedItemIds = new Set(); 

    for (const item of userWishlistItems) {
      if (processedItemIds.has(item._id)) {
        console.log(`Item ${item._id} has already been processed, skipping.`);
        continue;
      }

      try {
        const scrapedData = await scrapeData(item.link);
        if (scrapedData) {
          await findByIdAndUpdate(
            item._id,
            {
              $set: {
                title: scrapedData.title,
                description: scrapedData.description,
                image: scrapedData.image,
              },
            },
            { new: true }
          );
          enrichedItemCount++; 
          console.log(`Enriched item ${item._id} successfully.`);
          enrichedItems.push({ ...item.toObject(), ...scrapedData }); 
          processedItemIds.add(item._id);
        } else {
          erroredItemCount++; 
          console.error(`Error scraping data for item ${item.link}`);
        }
      } catch (error) {
        erroredItemCount++; 
        console.error(`Error enriching item ${item._id}: ${error}`);
      }
    }

    return res.status(200).json({
      message: 'Enrichment of user wishlist items completed successfully',
      totalItems: userWishlistItems.length,
      enrichedItems, 
      erroredItems: erroredItemCount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while enriching user wishlist items' });
  }
};