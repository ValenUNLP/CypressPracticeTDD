import LoginPage, { Login } from "../../pages/LoginPage"
import InventoryPage from "../../pages/InventoryPage"
const Users = require("../../fixtures/Accounts Fixtures/ValidAccounts.json")
const User = Users[0]

describe("Inventory",()=>{
    beforeEach(()=>{
        cy.visit("")
        LoginPage.Login(User.userName, User.password)
    })
    it("Show the page", ()=>{
        cy.url().should("be.equal", "https://www.saucedemo.com/inventory.html")
    })

    it("Show products",()=>{
        InventoryPage.elements.productsCards().should("have.length", 6)
    })
    
    
    it("should go to other page", ()=>{
        InventoryPage.elements.aboutMenuOption().should("have.attr", "href", "https://saucelabs.com/")
    })
    
    afterEach(()=>{
        InventoryPage.logout()
    })
})