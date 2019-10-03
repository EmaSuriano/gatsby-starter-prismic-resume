const puppeteer = require('puppeteer');

const resizePage = multiplier => ({
  width: `${1240 * multiplier}px`, // match the css width and height we set for our PDF
  height: `${1754 * multiplier}px`,
});

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8000/');
  await page.waitFor('header');
  await page.emulateMedia('screen');
  await page.pdf({
    path: './public/static/cv.pdf', // path (relative to CWD) to save the PDF to.
    printBackground: true, // print background colors
    ...resizePage(0.8),
  });

  await browser.close();
})();
