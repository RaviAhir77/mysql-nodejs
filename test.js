import puppeteer from 'puppeteer';
import fs from 'fs/promises'
async function generatePdf() {
    try {
        const browser = await puppeteer.launch({ headless: 'new', dumpio: true,  });
        const page = await browser.newPage();

        page.on('error', err => console.error('PAGE ERROR:', err));
        page.on('pageerror', err => console.error('PAGE JS ERROR:', err));
        page.on('console', msg => console.log('PAGE CONSOLE:', msg.type(), msg.text()));
        page.on('requestfailed', request => console.error('REQUEST FAILED:', request.url(), request.failure().errorText));
        page.on('response', response => {if (response.status() >= 400) {console.error('BAD RESPONSE:', response.url(), response.status());}});

        await page.setContent('<h1>Test Ravi</h1>', { waitUntil: 'networkidle0' });

        await page.evaluate(() => {
            window.onerror = function(message, source, lineno, colno, error) {
                if (!window.__puppeteer_errors__) {
                    window.__puppeteer_errors__ = [];
                }
                window.__puppeteer_errors__.push({ message, source, lineno, colno, error });
            };
        });

        const jsErrors = await page.evaluate(() => window.__puppeteer_errors__ || []);
        if (jsErrors.length > 0) {
            console.error('JavaScript Errors:', jsErrors);
        }

        await page.screenshot({ path: 'debug.png' });
        const html = await page.content();
        console.log("Page HTML : ", html);

        const pdfBuffer = await page.pdf({ format: 'A4' });

        await browser.close();

        await fs.writeFile('test.pdf', pdfBuffer);
        console.log('PDF generated: test.pdf');

    } catch (error) {
        console.error('Puppeteer Error:', error);
        console.error('Error Stack:', error.stack);
        console.error('Error Message:', error.message);
    }
}

generatePdf();