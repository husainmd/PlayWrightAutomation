import { test } from '@playwright/test';

test("Web Client App login", async ({ page }) => {
    const email = "anshika@gmail.com";
    const productName = "zara coat 3";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    // await page.waitForLoadState("networkidle"); //Discouraged to use
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles); 
  
});