/// <reference types ="cypress"/>

import dom from '../../Pages/Dom.cy'

const Dom = new dom;
describe("Successfully filtering computers by name",()=>{
    beforeEach(()=>{
        Dom.visit()
    })
    it("Filtering by an existing computer name",()=>{
        Dom.search().type("Macbook pro")
        Dom.search_submit().click()
        Dom.Prod_name().contains("MacBook Pro").should('be.visible')

    })
    it("Filtering by a non-existing computer name",()=>{
        Dom.search().type("MacandCheese")
        Dom.search_submit().click()
        Dom.error_message3().contains("Nothing to display").should('be.visible')
    })
    it("Filtering by a partial computer name",()=>{
        Dom.search().type("MacBook")
        Dom.search_submit().click()
        Dom.Prod_name().contains("MacBook Pro").should('be.visible')
    })
    it("Filtering by a case-insensitive computer name",()=>{
        Dom.search().type("Macbook pro")
        Dom.search_submit().click()
        Dom.Prod_name().contains("MacBook Pro").should('be.visible')
    })

})
    describe("Failing to filter computers by name",()=>{
        beforeEach(()=>{
            Dom.visit()
        })
        it("Filtering by a special character",()=>{
            Dom.search().type("@")
            Dom.search_submit().click()
            Dom.error_message3().contains("Nothing to display").should('be.visible')
        })
    })
