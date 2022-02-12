
const puppeteer = require("puppeteer");
const { randomInt } = require("./utils");
const utils = require("./utils");
class Puppet {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.browser = null;
        this.page = null;
    }

    async initialize () {
        console.log('initialize');
        this.browser = await puppeteer.launch({
            headless : false,
            args : ['--no-sandbox']
        });

        this.page = await this.browser.newPage();
        await this.page.goto(process.env.URL, {
            waitUntil: "networkidle2",
        });
    }

    async clockIn () {
        console.log('Start Clockin');
        // await utils.sleep(randomInt(10, 60) * 1000)
        await this.initialize();
        await this.login();

        const clockinBtn =
    "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div.__question__.office-form-question > div > div.office-form-question-element > div > div:nth-child(1) > div > label";
        await this.page.waitForSelector(clockinBtn);
        await this.page.click(clockinBtn);

        await this.page.click(
            "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-navigation-container > div.office-form-button-container > button"
          );
        
        const wfhBtn =
        "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div.__question__.office-form-question > div > div.office-form-question-element > div > div:nth-child(8) > div > label";
        
        await this.page.waitForSelector(wfhBtn);
        await this.page.click(wfhBtn);

        await this.page.click(
            "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-email-receipt-checkbox > div > div > label > span"
        );

        await this.page.waitForTimeout(1000);
        
        await this.page.click(
            "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-navigation-container > div.office-form-button-container > button.office-form-theme-primary-background.office-form-theme-button.office-form-bottom-button.button-control.light-background-button.__submit-button__"
        );

        await this.dispose();
        console.log('Done Clockin');
    }

    async clockOut (workDetail) {
        await this.initialize();
        await this.login();

        const clockoutBtn =
    "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div.__question__.office-form-question > div > div.office-form-question-element > div > div:nth-child(2) > div > label";
        await this.page.waitForSelector(clockoutBtn);

        await this.page.click(clockoutBtn);
        await this.page.waitForTimeout(1000);
        await this.page.click(
            "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-navigation-container > div.office-form-button-container > button"
        );

        const workDetailsTextarea =
            "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div.__question__.office-form-question > div > div.office-form-question-element > div > div > textarea";
        await this.page.waitForSelector(workDetailsTextarea);
        await this.page.type(workDetailsTextarea, "Software Development."); 

        await this.page.click(
            "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-email-receipt-checkbox > div > div > label > span"
          );
        
        await this.page.click(
        "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-navigation-container > div.office-form-button-container > button.office-form-theme-primary-background.office-form-theme-button.office-form-bottom-button.button-control.light-background-button.__submit-button__"
        );
    }

    async login () {
        await this.page.waitForSelector("#i0116");
        await this.page.type("#i0116", this.username);
        await this.page.click("#idSIButton9");

        await this.page.waitForSelector("#passwordInput");
        await this.page.type("#passwordInput", this.password);
        await this.page.click("#submitButton"); 

        await this.page.waitForSelector("#idBtn_Back");
        await this.page.click("#idBtn_Back");
        await this.page.waitForTimeout(1000);
    }

    async dispose() {
        await this.browser.close();
        this.page = null;
    }
}

module.exports = Puppet;