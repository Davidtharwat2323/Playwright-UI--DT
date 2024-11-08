//import from @playwright/test
import { expect, test } from "@playwright/test"
//create test cases
test.beforeEach("open URL", async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
});



test("Syntax of locator", async ({ page }) => {

    //get locator by Tag name
    page.locator("input")

    //get locator by ID we shall but #
    page.locator("#inputEmail1")


    //get locator by attribue
    page.locator('[placeholder="Email"]')


    // get locator by part of class we shall but . before 
    page.locator(".shape-rectangle")

    // get locator by full class 
    page.locator("input-full-width size-medium status-basic shape-rectangle nb-transition")
    //page.locator('["input-full-width size-medium status-basic shape-rectangle nb-transition"]')


    //get locator by doing combination one (no space between locator) (id+attribute+class)
    page.locator('#inputEmail1[placeholder="Email"].shape-rectangle')
    //get locator by doing combination one (to be more unique) (attribute+attibute)    
    page.locator('[placeholder="Email"][type="email"]')
    // page.locator('[placeholder="Email"]').locator('[type="email"]')

    //get by xpath [ easy to break when page changes ***Don't use it please****]
    page.locator('//*[@id="inputEmail1"]')

    //partial text match
    page.locator(':Text("Using")')

    //exact text match
    page.locator(':Text-is("Using the Grid")')

});

test("try another facing locators", async ({ page }) => {
    //will select first textbox with name email
    await page.getByRole("textbox", { name: "email" }).first().click();
         
    await page.getByRole("button", { name: "sign in" }).first().click();
    //get by label will click on Element
    await page.getByLabel("Email").first().click();
    //get by placeholder
    await page.getByPlaceholder("Email").first().click();
    // get by UI text
    await page.getByText("Forms").click();
    //get by title
    await page.getByTitle("IoT Dashboard").click();

    //get by special testID you need to add {data-testid="sign in"} inside form layout component html file

});

test("Child locator", async ({ page }) => {
    //first part from (div+sub div+text fun)

    await page.locator('nb-card nb-radio :text-is("Option 1")').click();
    //exactly same locator in anothe way
    await page.locator("nb-card").locator("nb-radio").locator("':text-is('Option 1')").click();
    //comine locator + grt role
    await page.locator("nb-card").getByRole("button", { name: "sign in" }).first().click();
});

test("parent locator", async ({ page }) => {
    //first part from (div+div2+text fun) 

    await page.locator("nb-card", { hasText: "Using the Grid" }).getByRole("button", { name: "sign in" }).first().click();

    await page.locator("nb-card", { has: page.locator("#InputEmail") }).getByRole("button", { name: "sign in" }).first().click();

    await page.locator("nb-card").filter({ hasText: "Basic Form" }).getByRole("button", { name: "sign in" }).first().click();

    await page.locator("nb-card").filter({ has: page.locator(".status-danger") }).getByRole("button", { name: "sign in" }).first().click();

    //get locator with relative value
    await page.locator("nb-card").filter({ has: page.locator("nb-checkbox") }).filter({ hasText: "sign in" })
        .getByRole("textbox", { name: "Email" }).first().click();

    //get locator by level up (relative)
    await page.locator("text-is:('Using the Grid')").locator('..').getByRole("textbox", { name: "Email" }).click();

});

test("Resuing Locator", async ({ page }) => {
//Common part of locator to be shared to all
    const BasicForm = page.locator('nb-card').filter({ hasText: "Basic Form" });

    const EmailField = BasicForm.getByRole("textbox", { name: "Email" });
    const PasseordField = BasicForm.getByRole("textbox", { name: "Password" });
    const CheckBoxField = BasicForm.locator(".custom-checkbox");
    const ClickSubmit = BasicForm.getByRole('button');

    await EmailField.fill("test123@outlook.com");
    await PasseordField.fill("P@ssw0rd");
    await CheckBoxField.check();
    await ClickSubmit.click();

    //assertion
   await expect(EmailField).toHaveValue("test123@outlook.com");
})

