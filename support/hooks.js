const { Before, After } = require("@cucumber/cucumber");
const { getPage, closeBrowser } = require("./browser");
const BorrowingCalculatorPage = require("../pages/borrowingCalculatorPage");

Before({ timeout: 120000 }, async function () {
  this.page = await getPage();
  this.calculatorPage = new BorrowingCalculatorPage(this.page);
  // Attach metadata
  this.attach(`Browser: Chromium`, "text/plain");
  this.attach(`Platform: ${process.platform}`, "text/plain");
});

After({ timeout: 60000 }, async function () {
  const duration = new Date() - this.startTime;
  this.attach(`Duration: ${duration}ms`, "text/plain");
  // Screenshot on failure
  if (this.scenario.result.status === "FAILED") {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, "image/png");
  }

  await closeBrowser();
});
