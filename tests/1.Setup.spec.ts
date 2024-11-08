//import from @playwright/test
import {test} from "@playwright/test"
//create test cases
test.beforeEach("open URL",async ({page})=>{
 await page.goto("http://localhost:4200/");
});


//how to group testcases "Test suite"

test.describe("Smoke test 1", ()=>{

    test.beforeEach("click on Form",async({page})=>{
       await page.getByText("Forms").click();

    })

    test("Click Forms Layout",async ({page})=>{
        await page.getByText("Form Layouts").click();

    })
})

test.describe("Smoke test 2",()=>{
    test.beforeEach("click on Tables & Data",async({page})=>{
       await page.getByText("Tables & Data").click();

    })

    
    test("Click Tree grid",async({page})=>{
        await page.getByText("Tree Grid").click();

    })
})
