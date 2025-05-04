const { test, expect, chromium } = require('@playwright/test')

test.skip('First PW test for full screen', async ({ }) => {
    const browser = await chromium.launch({
        headless: false,
        args: ["--start-maximized"],
    });
    const context = await browser.newContext({ viewport: null });
    const page = await context.newPage();
    await page.goto("http://automationpractice.multiformis.com/index.php?controller=authentication&back=my-account");
    console.log(await page.title());
    await page.locator("input#email").fill("test@pre.com"); //test@practice.com
    await page.locator("input[name='passwd']").fill("test@123");
    await page.locator("button[name='SubmitLogin']").click();
    console.log(await page.locator("div.alert.alert-danger li").textContent());
});

test('First PW test with invalid login', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    //await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.goto("http://automationpractice.multiformis.com/index.php?controller=authentication&back=my-account");
    console.log(await page.title());
    await page.locator("input#email").fill("test@pre.com"); //test@practice.com
    await page.locator("input[name='passwd']").fill("test@123");
    await page.locator("button[name='SubmitLogin']").click();
    console.log(await page.locator("div.alert.alert-danger li").textContent());
    await expect(await page.locator("div.alert.alert-danger li")).toContainText("Authenticationnn");
});

test('First PW test with valid login', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const userNameField = page.locator("input#email");
    const signinButton = page.locator("button[name='SubmitLogin']");
    const passwordField = page.locator("input[name='passwd']");
    const accountOperations = page.locator("ul.myaccount-link-list li span");

    await page.goto("http://automationpractice.multiformis.com/index.php?controller=authentication&back=my-account");
    console.log(await page.title());
    await userNameField.fill("test@praice.com");
    await page.locator("input[name='passwd']").fill("test@123");
    await signinButton.click();
    console.log(await page.locator("div.alert.alert-danger li").textContent());

    await userNameField.fill("");
    await userNameField.fill("test@practice.com");
    await passwordField.fill("test@123");
    await signinButton.click();
    //console.log(await page.locator("p.info-account").textContent());

    //console.log(await page.locator("ul.myaccount-link-list li span").textContent()); // Gives error as multiple macthing elements

    // console.log(await accountOperations.first().textContent()); //Finds first matching element
    // console.log(await accountOperations.nth(1).textContent()); // Has ')' based indexing and finds the 1st pos element that is the 2nd matching element

    console.log(await accountOperations.allTextContents());


});

test('First PW test with default context', async ({ page }) => {
    await page.goto("https://google.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test('First PW test for dropdown and radio buttons', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userNameField = page.locator("#username");
    const passwordField = page.locator("#password");
    const signInButton = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const userRadioBtn = page.locator(".customradio input[value='user'] ~ span");
    const termsCheckBox = page.locator("#terms");
    const blinkingLink = page.locator("a[target='_blank']");

    await userNameField.fill("rahulshettyacademy");
    await passwordField.fill("learning");
    await dropdown.selectOption("consult");
    await userRadioBtn.click();
    await page.locator("#okayBtn").click();
    await expect(userRadioBtn).toBeChecked();
    await termsCheckBox.click();
    await expect(termsCheckBox).toBeChecked();
    //await termsCheckBox.uncheck();
    await termsCheckBox.click();
    expect(await termsCheckBox.isChecked()).toBeFalsy();

    await expect(blinkingLink).toHaveAttribute("class", "blinkingText");

    await signInButton.click();
    await page.waitForTimeout(3300);
    //await page.pause();


});


test.only('First PW test for window handling', async ({ page }) => {
    const userNameField = page.locator("#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const blinkingLink = page.locator("a[target='_blank']");
    //var pageNew;

    const [newPage] = await Promise.all(
    [
        page.context().waitForEvent("page"),
        blinkingLink.click()
    ]);
    const redText = await newPage.locator("p.red").textContent();
    console.log(redText);
    const emailInRedText = redText.split("@")[1].split(" ")[0];
    console.log(emailInRedText);
    await page.waitForTimeout(2000);

    await page.bringToFront();
    await userNameField.fill(emailInRedText);
    await page.waitForTimeout(1500);
});