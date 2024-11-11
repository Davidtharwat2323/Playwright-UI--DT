import { expect, test } from "@playwright/test"
//create test cases
test("open Drag & Drop Site URL", async ({ page }) => {
 
   await page.goto("https://www.globalsqa.com/demo-site/draganddrop/");
    //await page.waitForTimeout(10000)
    const frame=page.frameLocator('[rel-title="Photo Manager"] iframe')
    const Distination= frame.locator('#trash')
    await frame.locator('li', {hasText:'High Tatras 2'}).dragTo(Distination)

   //use move to Drag and Drop
   await frame.locator('li', {hasText:'High Tatras 4'}).hover()
   //use to do (left,right,middle)
   await page.mouse.down()

   await Distination.hover()
   //release mouse
   await page.mouse.up()
    

   //await frame.locator('#trash li h5').first().waitForElementState('visible');
   //wait
  // await frame.locator('#trash li h5').first().waitFor();
   // assertion by array with two dim. with to inserted value
    await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2","High Tatras 4"])

})
