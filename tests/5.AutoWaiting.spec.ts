//import from @playwright/test
import { expect, test } from "@playwright/test"
import { timeout } from "rxjs/operators";
//create test cases
test.beforeEach("open URL", async ({ page }) => {
    await page.goto("https://uitestingplayground.com/ajax");
    await page.locator("#ajaxButton").click();
});

//how to override timeout in level of current class not global project
/*
test.beforeEach("open URL", async ({ page },testinfo) => {
    await page.goto("https://uitestingplayground.com/ajax");
    await page.locator("#ajaxButton").click();
    //override timeout +2 sec
    testinfo.setTimeout(testinfo.timeout+2000)
});
*/

test("AutoWaiting", async ({ page }) => {
    //normal case and Textcontent has autowait internally

    //locator
    //const SuccessMsg =await page.locator(".bg-success").textContent();

    //assertion
    //expect(SuccessMsg).toEqual("Data loaded with AJAX get request.")

    //********abnormal case alltxtcontent not have autowait ***//

    //all textcontent shall have function Contains not Equal
    //const SuccessMsg2 =await page.locator(".bg-success").allTextContents();

    //shall assert by toContainText fun
    //expect(SuccessMsg2).toContainText("Data loaded with AJAX get request.")

    //*******************we will customize wait (fluent)so we will add custimization********************//
    const SuccessMsg2 = page.locator(".bg-success")
    await SuccessMsg2.waitFor({ state: "visible" })
    //default time is 30 sec
    //await SuccessMsg2.waitFor({timeout:60000})
    expect(SuccessMsg2).toContainText("Data loaded with AJAX get request.")
    //autowait on assertion to wait 20 sec before through error
    //expect(SuccessMsg2).toHaveText("Data loaded with AJAX get request.",{timeout:20000});

});

test("Alternative Waits", async ({ page }) => {
    const SuccessMsg2 = page.locator(".bg-success")

    //wait for element
    await page.waitForSelector(".bg-success")

    //wait for particular response (API response)
    await page.waitForResponse("https://uitestingplayground.com/ajaxdata")

    //Wait for all APis to be called and completed "Not recommended "f failed to get API tests will fail

    await page.waitForLoadState("networkidle")

    await SuccessMsg2.waitFor({ state: "visible" })
    //default time is 30 sec
    expect(SuccessMsg2).toContainText("Data loaded with AJAX get request.")


});

test("TimeOut", async ({ page }) => {

    //wai on button level
    const SuccessMsg2 = page.locator(".bg-success")
    //special handling for this button to wait 16 sec after that will timeout
    await SuccessMsg2.click({ timeout: 16000 })

    //wait on testcase level

    // can add in "playwright.config.ts" file a value timout:20000 ms with method slow

    // const SuccessMsg2 = page.locator(".bg-success")
    //test.slow()
    // await SuccessMsg2.click()

    //here we use hard wait because the playwright faster than UI is some case
    //await page.waitForTimeout(500)
});