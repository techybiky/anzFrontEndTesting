const fs = require("fs");
const os = require("os");
const path = require("path");
const reporter = require("multiple-cucumber-html-reporter");

const reportsDir = path.join(process.cwd(), "reports");
const htmlDir = path.join(reportsDir, "html");
const resultsJsonPath = path.join(reportsDir, "results.json");

fs.mkdirSync(reportsDir, { recursive: true });
fs.mkdirSync(htmlDir, { recursive: true });

if (!fs.existsSync(resultsJsonPath)) {
    const fallbackHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Borrowing Calculator Report</title>
</head>
<body>
    <h1>Borrowing Calculator Report</h1>
    <p>No Cucumber JSON results were found.</p>
</body>
</html>`;

    fs.writeFileSync(path.join(htmlDir, "index.html"), fallbackHtml);
    console.log("No results.json found; wrote a fallback HTML report.");
    process.exit(0);
}

// Safe metadata creation
const metadata = {
    browser: {
        name: process.env.BROWSER || "Chromium",
        version: process.env.BROWSER_VERSION || "Latest"
    },
    device: process.env.DEVICE || "Local Machine",
    platform: {
        name: os.platform(),
        version: os.release()
    }
};

try {
    reporter.generate({
        jsonDir: reportsDir,
        reportPath: htmlDir,

        reportName: "Borrowing Calculator Report",
        pageTitle: "Automation Report",
        displayDuration: true,
        displayReportTime: true,
        openReportInBrowser: false,

        metadata,

        customData: {
            title: "Execution Information",
            data: [
                { label: "Project", value: "Borrowing Calculator" },
                { label: "Framework", value: "Playwright + Cucumber + JavaScript" },
                { label: "Environment", value: process.env.ENV || "QA" },
                { label: "Executed By", value: process.env.USERNAME || process.env.USER || "Local User" },
                { label: "Node Version", value: process.version },
                { label: "Execution Time", value: new Date().toLocaleString() }
            ]
        }
    });

    console.log("HTML report generated successfully.");

} catch (error) {
    console.error("Failed to generate HTML report.");
    console.error(error);
    process.exit(1);
}