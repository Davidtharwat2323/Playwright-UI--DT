//import from @playwright/test
import { expect, test } from "@playwright/test"
import { PieChartComponent } from "@swimlane/ngx-charts";
import { delay } from "rxjs-compat/operator/delay";
//create test cases
test.beforeEach("open URL", async ({ page }) => {
    await page.goto("http://localhost:4200/");
})

test.describe("IoT DashBoard", ()=>{

    test.beforeEach("click on DashBoard Icon",async({page})=>{
       await page.getByText("IoT Dashboard").click();

    })
     //we need to catch slider and set to maxmimum value and assert it correct
    test("Slider without mouse action",async ({page})=>{
       const TempTab=page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
       const ClickCircle=TempTab.locator('circle')
       //const AssertCelesuisValue=TempTab.locator('[ng-reflect-set-value="30"]')


      //we will set x , y
       await ClickCircle.evaluate(Node =>{
          Node.setAttribute('cx','232.630')
          Node.setAttribute('cy','232.630')


       })
       // we shall do click to contol event on screen
         await ClickCircle.click()
      await expect(TempTab).toContainText('30')
       
    })

    test("Slider with mouse Movement",async ({page})=>{
        const TempBox=page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
       //to scroll to view itself
        await TempBox.scrollIntoViewIfNeeded()
        //const AssertCelesuisValue=TempTab.locator('[ng-reflect-set-value="30"]')
        //here we will get (x,y) to selected view of slider bounding box is method developed by playwright 
        const box= await TempBox.boundingBox() 
        const x=box.x + box.width /2
        const y=box.y + box.width /2
        //now we set our mouse to be in center //will be 30 maximum value
        await page.mouse.move(x,y)
        //now move down
        await page.mouse.down()
        //we need to move to right
        await page.mouse.move(x +100 ,y)
        //another move to right down
        await page.mouse.move(x +100 ,y +100)
         //Release the mouse
        await page.mouse.up()
        
        ////////////////////we need to move mouse to be mimimum =0 //////////////////
        
        await page.mouse.move(x,y)
        //now move down
        await page.mouse.down()
        //we need to move to right
        await page.mouse.move(x -100 ,y)
        //another move to right down
        await page.mouse.move(x -100 ,y+100)
         //Release the mouse
        await page.mouse.up()

 
        await expect(TempBox).toContainText('12')
      
     })


    })
//how to group testcases "Test suite"

test.describe("Open Form layouts", () => {

    test.beforeEach("click on Form", async ({ page }) => {
        await page.getByText("Forms").click();
       
    })
    //UI input textbox & Radio button & dropdown list
    test("Input text", async ({ page }) => {
        await page.getByText("Form Layouts").click();
        const EmailInput = page.locator("nb-card", { hasText: ("Using the Grid") })
            .getByRole('textbox', { name: "Email" })
        await EmailInput.fill("text@test.com")
        //clear input
        await EmailInput.clear()
        //press sequencally
        await EmailInput.pressSequentially("text2@test.com", { delay: 200 })

        //assertion
        const inputValue = await EmailInput.inputValue();
        expect(inputValue).toEqual("text2@test.com")
        //loctor assertion
        await expect(EmailInput).toHaveValue("text2@test.com")
    })
    //Radio Button
    test("Radio Button check", async ({ page }) => {
        await page.getByText("Form Layouts").click();
        const CheckRadioButton = await page.locator("nb-card", { hasText: ("Using the Grid") })
            .getByText("Option 1")
        //.getByLabel("Option 1")
        // .getByRole("radio",{name :"Option 1"}).check({force:true})
        // will work if it not hidden
        //await CheckRadioButton.check()

        //if it is hidden
        await CheckRadioButton.check({ force: true })
        //  await CheckRadioButton.check()

        //Assertion
        const Option1IsChecked = await page.locator("nb-card", { hasText: ("Using the Grid") })
            .getByText("Option 1").isChecked()
        //assertion with boolean true value
        expect(Option1IsChecked).toBeTruthy()
        //assertion it is checked
        //await expect (CheckRadioButton.getByRole("radio",{name :"Option 1"})).toBeChecked()

        //now we need to check if we select option2 ,option 1 will dechecked
        /*
        await page.locator("nb-card", { hasText: ("Using the Grid") })
        .getByText("Option 2").check()
        expect(await page.locator("nb-card", { hasText: ("Using the Grid") })
        .getByText("Option 2").check({force:true})).toBeFalsy()

        expect(await page.locator("nb-card", { hasText: ("Using the Grid") })
        .getByText("Option 1").check({force:true})).toBeTruthy()
*/
    })
    //dropdown
    test("DropDown list", async ({ page }) => {
        await page.getByText("Form Layouts").click();
        const DropdownlistMenu = page.locator("ngx-header nb-select")
        await DropdownlistMenu.click()


        //best way in playwright get by role for Option list
        //  page.getByRole("list") //when list has UL tag
        //  page.getByRole("listitem") //when list has LI tag

        //in this case it not use ul or Li list in dom he is using  so we will create a custome locator
        const selectedOptionlist = page.locator("nb-option-list nb-option")
        //check locator get list correctly
        const optionsText = await selectedOptionlist.allTextContents();
        console.log("Options available:", optionsText);


        //assertion on list
        await expect(selectedOptionlist).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])


        //will use filter to get value from list and click
        await selectedOptionlist.filter({ hasText: "Cosmic" }).click()

        //Validate background colour 
        const header = page.locator("nb-layout-header")
        await expect(header).toHaveCSS("background-color", 'rgb(50, 50, 89)')

        ///////////////////////////////////////////////////////////////////////////////////////////////

        /* during this scenario i will 
        loop through the list and check all element and click all elements to check all background colors
        /*
    
        
        //Create object of all colors
     const Colors={
        "Light":"rgb(255, 255, 255)",
        "Dark":"rgb(34, 43, 69)",
        "Cosmic":"rgb(50, 50, 89)",
        "Corporate":"rgb(255, 255, 255)",
     }
     //click menu button
      await DropdownlistMenu.click()
     for(const color in Colors){
        await selectedOptionlist.filter({hasText: color}).click()
        //Validate background colour 
        const header= page.locator("nb-layout-header")
        await expect(header).toHaveCSS("background-color",Colors[color])
       
        //last element to get out from loop
        if(color!='Corporate'){
        await DropdownlistMenu.click()
        }
     }
    
    */

    })
    //DatePicker with a simple scenario 
    test("DatePicker 1", async ({ page }) => {
    await page.getByText("Datepicker").click();

    const DatePickerClicked=  page.locator('nb-card-body').getByPlaceholder("Form Picker")
    await DatePickerClicked.click()
    await page.locator('[class="day-cell ng-star-inserted"]')
    //we will use exact with value true to get value exact matched 
    .getByText('2', {exact:true}).click()

    await expect(DatePickerClicked).toHaveValue('Nov 2, 2024')

    })
    //useing Data class to customize
    test("DatePicker 2", async ({ page }) => {
        await page.getByText("Datepicker").click();
    
        const DatePickerClicked=  page.locator('nb-card-body').getByPlaceholder("Form Picker")
        await DatePickerClicked.click()

        let date = new Date()
        // for more methods about time check this "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date"
        //Get current data and add +1 day
        date.setDate(date.getDate()+27)
        const ExpectedDate = date.getDate().toString()
        // to write short 'Nov 5,2024'
        //Nov
        const ExpectedMonthshort =date.toLocaleDateString('US-en', {month:'short'})
        const ExpectedMonthlong =date.toLocaleDateString('US-en', {month:'long'})
        //2024
        const ExpectedYear=date.getFullYear()
        //buold format to 'Nov 5,2024' using sympol ` not a single quoate '
        //please the value between`${ExpectedMonthshort} ${ExpectedDate}, ${ExpectedYear}` shall match action with spaces
        const DateAssert=`${ExpectedMonthshort} ${ExpectedDate}, ${ExpectedYear}`
        // if user enter a value in next month +30 day not 1
        let CalenderMonthAndYear=await page.locator('nb-calendar-view-mode').textContent()
        const ExpectedMonthAndYear=` ${ExpectedMonthlong} ${ExpectedYear} `
        while(!CalenderMonthAndYear.includes(ExpectedMonthAndYear)){
            //click on arrow to next month
            await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
             CalenderMonthAndYear=await page.locator('nb-calendar-view-mode').textContent()
        }

        await page.locator('[class="day-cell ng-star-inserted"]')
        //we will use exact with value true to get value exact matched 
        .getByText(ExpectedDate, {exact:true}).click()
        

        //we will convert this value to be dynamic as well "Nov 5, 2024"
        await expect(DatePickerClicked).toHaveValue(DateAssert)
    
        })



})



test.describe("Open page Modal & Overlays ", () => {

    test.beforeEach("Reach to page ", async ({ page }) => {
        await page.getByText("Modal & Overlays").click()
       
    })
        /*
        please use check & uncheck methods Not use Click ,because click perfrom 
        action click and if checkbox is ticked it will be converted to uncheck
*/    
    test("Checkbox ", async ({ page }) => {
        await page.getByText("Toastr").click()
      await  page.getByRole("checkbox", {name: 'Hide on click'}).uncheck({force: true })
      await page.getByRole("checkbox", {name: 'Prevent arising of duplicate toast'}).check({force: true })

        //in our case we have 2 checkboxes already tiched we will do uncheck to all checkboxes
        const allboxes = page.getByRole("checkbox")
        for (const box of await allboxes.all()) {
            await box.uncheck({ force: true })
            const validatechecked = await box.isChecked()
            expect(validatechecked).toBeFalsy()
        }
    })

    test("ToolTip",async ({page})=>{
        await page.getByText("Tooltip").click()

         const toolTipCard= page.locator("nb-card",{hasText : 'Tooltip Placements'})
         const Button=await toolTipCard.getByRole("button",{name:'Top'}).hover()

         page.getByRole("tooltip") // get all page tooltip
         const alltooltips=await page.locator('nb-tooltip').textContent()
          expect(alltooltips).toEqual("This is a tooltip")
     })
})


////

test.describe("Open page Tables & Data ", () => {

    test.beforeEach("Reach to page ", async ({ page }) => {
        await page.getByText("Tables & Data").click()
        await page.getByText("Smart Table").click()
    })
     
    test("Dialog or alerts", async ({ page }) => {
        

        page.on('dialog', dialog =>{
            expect(dialog.message()).toEqual("Are you sure you want to delete?")
            dialog.accept()
        })
        await page.getByRole("table").locator('tr',{hasText :"mdo@gmail.com"}).locator(".nb-trash").click()
        await expect(page.locator('table tr').first()).not.toHaveText("mdo@gmail.com")
        
    })
     //edit a value for spacific field and click Save 
    test("Web Table 1", async ({ page }) => {
      //1 get the row with any test in the row
      const Editfield= await page.getByRole("row",{name:'twitter@outlook.com'})
     const ClickEditfield= Editfield.locator(".nb-edit").click()
     await page.locator("input-editor").getByPlaceholder("age").clear() 
     await page.locator("input-editor").getByPlaceholder("age").fill('18') 

     await page.locator(".nb-checkmark").click()
     
    })
    //navigate to page 2 then change value of spacific cell in table
    test("Web Table 2", async ({ page }) => {
        //2 get the row based on a spaceific value in column
        const NaviageTopageTwo =await page.locator('.ng2-smart-pagination-nav')
        .getByText("2").click()

        /*
        now we need to get locator by ID = 11 (tricky) 
        if we do fitch by text =11 it will get all values = 11 in current page but we need to get spacific value 
         so we will use index .
        */
        //this row will return 2 rows with value 11
        const TrgetRowById=page.getByRole("row",{name:"11"})
         //we will get by index=1 because it's the first one in page
        .filter({has :page.locator("td").nth(1).getByText('11')})
        const Editfield=  page.getByRole("row",{name:'mark@gmail.com'})
        const ClickEditfield=await Editfield.locator(".nb-edit").click()
        await page.locator("input-editor").getByPlaceholder("E-mail").clear() 
        await page.locator("input-editor").getByPlaceholder("E-mail").fill('www.david.com')
        await page.locator(".nb-checkmark").click() 

        //Assertion
        // TrgetRowById contains ( row number 1 )
        //we need to assert on coulmn number 5 row number 1 that our value changed 
        await expect(TrgetRowById.locator('td').nth(5)).toHaveText('www.david.com')
      })
        //search with spacific value to test filter of table (Searchbox)
      test("Web Table 3", async ({ page }) => {
        //Create a array of ages contains list of inputs to you need to be values in searchbox
         const ages=['20', '30', '40', '200']
        //Create a loop to enter each value im Age array 
           for(let age of ages){
        //Create a loop to get all filtered values
         await page.locator("input-filter").getByPlaceholder("Age").clear() 
         await page.locator("input-filter").getByPlaceholder("Age").fill(age)
         //her we use hard wait because the playwright faster than UI
         await page.waitForTimeout(500)
       //get all Rows in table 
        const AgeRows=page.locator('tbody tr')

        for(let row of await AgeRows.all()){
            //get value from Cell by catch Row
          const CellValue=await row.locator('td').last().textContent()
          //Create Condtion if user Entered value age =200 it will return string "no data found"
          if (age =='200'){
               expect(await page.getByRole('table').textContent()).toContain('No data found')
           }else{
            expect(CellValue).toEqual(age)
           }
             
        }
    }
      })
   
})

