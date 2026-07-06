# Borrowing Calculator UI Tests

Simple automated UI tests for a public borrowing calculator using **Cucumber BDD**, **Playwright**, and the **Page Object Model**.

This README contains all setup, run, report, and project recreation steps so the same project can be created on another machine or directly in a personal GitHub repository.

## Prerequisites

Before running the project, install:

- Node.js 18 or later
- npm
- Git, if cloning from a repository

Check the installed versions:

```bash
node --version
npm --version
```

## What is covered

1. A single applicant with the requested values should see a borrowing estimate of **$494,000**.
2. Clicking **Start over** should clear the form.

## Test data used

The main calculation scenario uses this data:

| Field | Value |
| --- | --- |
| Application type | Single |
| Dependants | 0 |
| Property type | Home to live in |
| Annual income | 100000 |
| Other annual income | 10000 |
| Monthly living expenses | 2000 |
| Current home loan repayments | 0 |
| Other loan repayments | 100 |
| Other monthly commitments | 0 |
| Total credit card limits | 10000 |

Expected borrowing estimate: **$494,000**.

## Framework structure

```text
FrontEndTesting/
├── features/
│   └── calculator.feature                 # Test scenarios written in Gherkin
├── step_definitions/
│   └── calculator.steps.js                # Step definitions for the feature file
├── support/
│   ├── browser.js                         # Playwright browser and page setup
│   └── hooks.js                           # Cucumber Before, After, and AfterAll hooks
├── pages/
│   └── borrowingCalculatorPage.js         # Page Object Model for calculator actions
├── scripts/
│   ├── generate-html-report.js            # Builds HTML report from JSON
│    
├── .gitignore                             # Files and folders ignored by Git
├── cucumber.js                            # Cucumber config and report outputs
├── LICENSE                                # Project license
├── package.json                           # Dependencies and scripts
└── README.md
```

Generated after running tests:

```text
reports/
├── results.json                           # Cucumber JSON result
├── results.xml                            # JUnit XML result
├── results.ndjson                         # Cucumber message result
└── report.html                            # HTML report
```

The `reports/` folder is generated when tests run, so it may not exist before the first test execution.

## Files to create in a new repository

If creating this project again in GitHub web or on a personal laptop, create these files and folders:

```text
features/calculator.feature
step_definitions/calculator.steps.js
support/browser.js
support/hooks.js
pages/borrowingCalculatorPage.js
scripts/generate-html-report.js
scripts/prepare-reports.js
.gitignore
cucumber.js
LICENSE
package.json
README.md
```

Do not manually create these folders/files unless they are generated or installed locally:

```text
.git/
node_modules/
reports/
```

These are local/generated folders and should not be committed.

## Why this structure is simple

- **Feature file** contains readable business scenarios only.
- **Step file** maps Gherkin steps to page-object actions and assertions.
- **Page object** contains selectors and page interactions.
- **Support files** contain browser lifecycle code.
- **Reports** are created fresh on every run in the `reports` folder.

## Setup

Step 1: Install dependencies:

```bash
npm install
```

Step 2: Install the Chromium browser used by Playwright:

```bash
npx playwright install chromium
```

## Create this project on a personal laptop

Use this approach if you need a clean copy in a personal GitHub repository.

Step 1: Create a new folder:

```bash
mkdir FrontEndTesting
cd FrontEndTesting
```

Step 2: Create the folder structure:

```bash
mkdir features step_definitions support pages scripts
```

Step 3: Copy or recreate the project files listed in the **Files to create in a new repository** section.

Step 4: Install dependencies:

```bash
npm install
```

Step 5: Install Playwright Chromium:

```bash
npx playwright install chromium
```

Step 6: Run the tests:

```bash
npm test
```

Step 7: Generate the HTML report:

```bash
npm run test:report
```

Step 8: Initialize Git and push to your own repository:

```bash
git init
git add .
git commit -m "Initial commit: borrowing calculator UI tests"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPOSITORY_NAME` with your personal GitHub details.

## Create this project directly in GitHub web

Use this approach if you want to create the project manually in a GitHub repository without pushing from this machine.

1. Create a new repository in your personal GitHub account.
2. Create each file from the **Files to create in a new repository** section.
3. For files inside folders, use the full path when creating the file in GitHub web. Example: `features/calculator.feature`.
4. Copy the content from your local project files into the matching GitHub files.
5. Commit the files from GitHub web.
6. On your personal laptop, clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
cd YOUR_REPOSITORY_NAME
```

7. Install and run locally:

```bash
npm install
npx playwright install chromium
npm run test:report
```

## Clean-copy checklist

Before copying this project to another machine or repository, include only project source files:

- `features/`
- `step_definitions/`
- `support/`
- `pages/`
- `scripts/`
- `.gitignore`
- `cucumber.js`
- `LICENSE`
- `package.json`
- `README.md`

Do not copy:

- `.git/`
- `node_modules/`
- `reports/`
- npm debug logs
- local credentials or tokens
- machine-specific Git credentials

## Run tests

Step 3: Run tests and produce JSON, XML, and NDJSON output:

```bash
npm test
```

Step 4: Run tests and generate the HTML report:

```bash
npm run test:report
```

Step 5: Use this command in CI:

```bash
npm run test:ci
```

## Open the HTML report

After running `npm run test:report`, open this file in a browser:

```bash
reports/report.html
```

On Windows, you can open it from File Explorer or run:

```bash
start reports/report.html
```

## Results

After each run, results are created in the `reports` folder:

- `reports/results.json` - Cucumber JSON result
- `reports/results.xml` - JUnit XML result
- `reports/results.ndjson` - Cucumber message result
- `reports/report.html` - HTML report generated from JSON

The `reports` folder is cleared and recreated before every test run, so every run produces fresh results.

## How the test flow works

1. Cucumber reads the scenarios from `features/calculator.feature`.
2. The matching step definitions run from `step_definitions/calculator.steps.js`.
3. The Cucumber hooks create a fresh Playwright browser page before each scenario.
4. The step definitions call methods from the Page Object Model class.
5. The page object fills the form, submits it, reads the result, and checks whether the form is cleared.
6. Cucumber writes JSON, XML, and NDJSON reports.
7. The HTML report script builds `reports/report.html` from the JSON result.

## Main files to explain in an interview

- `features/calculator.feature` explains the two required business scenarios.
- `pages/borrowingCalculatorPage.js` is the Page Object Model class.
- `step_definitions/calculator.steps.js` keeps the steps short and readable.
- `support/hooks.js` creates a fresh browser page for each scenario.
- `cucumber.js` configures CLI execution and report output.

## Useful npm scripts

| Command | Purpose |
| --- | --- |
| `npm install` | Installs project dependencies |
| `npx playwright install chromium` | Installs the browser used by the tests |
| `npm test` | Runs the tests and creates machine-readable reports |
| `npm run test:report` | Runs the tests and creates the HTML report |
| `npm run test:ci` | Runs the CI-friendly test command |

## Troubleshooting

If dependencies are missing, run:

```bash
npm install
```

If Chromium is missing, run:

```bash
npx playwright install chromium
```

If reports are missing, run:

```bash
npm run test:report
```

If a test times out, rerun the test because the target page is a public website and can sometimes load slowly.
