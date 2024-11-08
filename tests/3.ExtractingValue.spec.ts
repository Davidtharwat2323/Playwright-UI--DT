//import from @playwright/test
import { expect, test } from "@playwright/test"
//create test cases
test.beforeEach("open URL", async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
});

test("Extracting value",async ({page})=>{
    //extract single test value
    const BasicForm = page.locator('nb-card').filter({ hasText: "Basic Form" });
    const ButtonText= await BasicForm.locator('button').textContent();

    expect(ButtonText).toEqual("Submit");

    //extract all multi test value
     const AllradioButtonText=await page.locator("nb-radio").allTextContents()
     expect(AllradioButtonText).toContain("Option 1")

     //extract input value
      const EmailField =BasicForm.getByRole("textbox",{name:'Email'})
      await EmailField.fill("test@test.com")
      const EmailValue=await EmailField.inputValue();
      expect(EmailValue).toEqual("test@test.com")

      //extract a value of attribute
      const PlaceHolderValue=await EmailField.getAttribute('placeholder')
      expect(PlaceHolderValue).toEqual("Email")

});