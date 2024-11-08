//import from @playwright/test
import { expect, test } from "@playwright/test"
//create test cases
test.beforeEach("open URL", async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
});

test("Assertion",async ({page})=>{
    const BasicFormButton = page.locator('nb-card').filter({ hasText: "Basic Form" }).locator("Button");
    //General Assertion
    const x=6;
    expect(x).toEqual(6)

    const ButtonText= await BasicFormButton.locator('button').textContent();
    expect(ButtonText).toEqual("Submit");

    //locator assertion
    //if u do assertion with locator u shall add await to check action 
    await expect(BasicFormButton).toHaveText("Submit")

    //soft assertion
    //there is no text called submit12 it will be bypass if it failed
    await expect.soft(BasicFormButton).toHaveText("Submit12")
     await BasicFormButton.click();
});

 /*
check lesson of drag and drop with Iframe to see real example
//we have a selected list of image moved to Distniagton and need to check it is moved correctly

// assertion by array with two dim. 
   expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2","High Tatras 4"])

*/