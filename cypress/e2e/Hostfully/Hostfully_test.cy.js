/// <reference types ="cypress"/>

import dom from '../../Pages/Dom.cy.js'

const Dom = new dom;

describe("Successfully adding a new computer",()=>{
    beforeEach(()=>{
        Dom.visit()
    })
    it("Valid computer details are entered and the computer is successfully added",()=>{
        Dom.add_new().click()

        //Filling in the required form

        Dom.computer_name().type("Test Computer");
        Dom.introduce().type("2022-01-01");
        Dom.discontinued().type("2023-01-02")
        Dom.company().select("Apple Inc.")

        // submitting the form
        Dom.submit_button().click()

        //verifying newly added computer
        Dom.success_message().contains("Done ! Computer Test Computer has been created")
        Dom.count().should("have.text","575 computers found")
        Dom.table().contains('Test Computer').should('be.visible')

    })

    it(" A computer with a blank introduced date is added",()=>{
        Dom.add_new().click()

        Dom.computer_name().type("Test Computer 2");
        Dom.discontinued().type("2023-01-02")
        Dom.company().select("Apple Inc.")

        Dom.submit_button().click()

         //verifying newly added computer
         Dom.success_message().contains("Done ! Computer Test Computer 2 has been created")
         Dom.count().should("have.text","576 computers found")
         Dom.table().contains('Test Computer 2').should('be.visible')
    })

        
    it("Adding a computer with a valid name, but no company",()=>{
        Dom.add_new().click()

        Dom.computer_name().type("Test Computer 3");
        Dom.introduce().type("2022-01-02");
        Dom.discontinued().type("2023-01-01")

        //submitting the form
        Dom.submit_button().click()

     //verifying newly added computer
         Dom.success_message().contains("Done ! Computer Test Computer 3 has been created")
         Dom.count().should("have.text","577 computers found")
         Dom.table().contains('Test Computer 3').should('be.visible')


    })
    it("Adding a computer with a long name",()=>{
        Dom.add_new().click()

        Dom.computer_name().type("This is a really long computer name that exceeds the maximum length allowed by the application");
        Dom.introduce().type("2022-01-02");
        Dom.discontinued().type("2023-01-01")
        Dom.company().select("Apple Inc.")

        //submitting the form
        Dom.submit_button().click()

    
         Dom.success_message().should("not.be.visible")
         
        

    })
})
describe("Failing to add a new computer with invalid data",()=>{
    beforeEach(()=>{
        Dom.visit()
    })
    it("Adding a computer with a blank name",()=>{
        Dom.add_new().click()

        //Filling in the required form

        Dom.introduce().type("2022-01-01");
        Dom.discontinued().type("2023-01-02")
        Dom.company().select("Apple Inc.")

        // submitting the form
        Dom.submit_button().click()

        Dom.error().should("contain","Failed to refine type : Predicate isEmpty() did not fail.")

    })
    it("Adding a computer with invalid date range",()=>{
        Dom.add_new().click()

        //Filling in the required form
        Dom.computer_name().type("Test computer 4")
        Dom.introduce().type("2023-01-01");
        Dom.discontinued().type("2022-01-02")
        Dom.company().select("Apple Inc.")

        // submitting the form
        Dom.submit_button().click()

        Dom.error_message().should("contain","Discontinued date is before introduction date")
    })
    it("Adding a computer with an invalid introduced date",()=>{
        Dom.add_new().click()

        //Filling in the required form
        Dom.computer_name().type("Test computer 5")
        Dom.introduce().type("01=01-2021");
        Dom.discontinued().type("2022-01-02")
        Dom.company().select("Apple Inc.")

        // submitting the form
        Dom.submit_button().click()

        Dom.error_message2().should("contain","Failed to decode date : java.time.format.DateTimeParseException: Text '01=01-2021' could not be parsed at index 0")

    })
})



