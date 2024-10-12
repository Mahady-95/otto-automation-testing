const fs = require('fs');
const path = require('path');
const playwright = require('playwright');

async function generatePDFfromHTML(htmlContent, outputPath) {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  await page.pdf({ path: outputPath });
  console.log('PDF generated successfully');
  await browser.close();
}

async function convertHTMLFileToPDF(htmlFilePath, outputPath) {
  try {
    const htmlContent = await fs.promises.readFile(htmlFilePath, 'utf-8');
    await generatePDFfromHTML(htmlContent, outputPath);
  } catch (error) {
    console.error('Error converting HTML to PDF:', error);
  }
}

// Usage: Replace 'index.html' and 'custom.pdf' with your actual file paths
const htmlFilePath = path.join(__dirname, '..','playwright-report','index.html');
const outputFilePath = path.join(__dirname, '..','test-results','testreport.pdf');

convertHTMLFileToPDF(htmlFilePath, outputFilePath);