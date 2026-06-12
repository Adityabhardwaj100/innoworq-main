const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 10000)); // wait 10s for React to render and Next.js to compile
  await page.screenshot({ path: '/Users/adityabhardwaj/.gemini/antigravity-ide/brain/e4d127ae-7fc1-41ea-8260-f5abff77fb2b/latest_screenshot.png', fullPage: true });
  await browser.close();
})();
