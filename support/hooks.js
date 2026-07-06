const { Before, After, Status } = require("@cucumber/cucumber");
const { getPage, closeBrowser } = require("./browser");
const BorrowingCalculatorPage = require("../pages/borrowingCalculatorPage");

Before({ timeout: 120000 }, async function () {
    this.page = await getPage();
    this.calculatorPage = new BorrowingCalculatorPage(this.page);
    this.startTime = new Date();
});

After({ timeout: 60000 }, async function (scenario) {
    try {
        const duration = new Date() - this.startTime;
        this.attach(`Duration: ${duration}ms`, 'text/plain');
        
        // Take screenshot on failure
        if (scenario.result.status === Status.FAILED) {
            try {
                const screenshot = await this.page.screenshot();
                this.attach(screenshot, 'image/png');
            } catch (error) {
                this.attach(`Screenshot error: ${error.message}`, 'text/plain');
            }
        }
    } catch (error) {
        console.error(`Error in After hook: ${error.message}`);
    } finally {
        await closeBrowser();
    }
});