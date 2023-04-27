/// <reference types ="cypress"/>

import dom from '../../Pages/Dom.cy.js'

const Dom = new dom;

describe("Computer Database Demo Application",()=>{
    beforeEach(()=>{
        Dom.visit()
    })
    it("should be able to add a new computer",()=>{
        Dom.add_new().click()

        //Filling in the required form

        Dom.computer_name().type("Test Computer");
        Dom.introduce().type("2022-01-01");
        Dom.discontinued().type("2022-01-02")
        Dom.company().select("Apple Inc.")

        // submitting the form
        Dom.submit_button().click()

        //verifying newly added computer
        Dom.success_message().contains("Done ! Computer Test Computer has been created")
        Dom.count().should("have.text","574 computers found")
        Dom.table().contains('Test Computer').should('be.visible')

    })

    it("should display error messages for invalid input when adding a new computer",()=>{
        Dom.add_new().click()

        //submitting form without filling in the form
        Dom.submit_button().click()

        //verifying error message
        Dom.error().should("have.text","Failed to refine type : Predicate isEmpty() did not fail.")
    })
})

