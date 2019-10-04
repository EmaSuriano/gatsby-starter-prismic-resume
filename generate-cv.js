const puppeteer = require('puppeteer');

const PAGES_SIZES = {
  A5: {
    width: 874,
    height: 1240,
  },
  A4: {
    width: 1240,
    height: 1754,
  },
  A3: {
    width: 1754,
    height: 2480,
  },
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8000/');
  await page.waitFor('header');
  await page.emulateMedia('screen');
  await page.pdf({
    path: './public/static/cv.pdf',
    printBackground: true,
    ...PAGES_SIZES.A4,
  });

  await browser.close();
})();
