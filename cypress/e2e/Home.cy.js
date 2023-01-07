import LoginPage, { Login } from "../pages/LoginPage"
import InventoryPage from "../pages/InventoryPage"
const ValidAccounts = require("../fixtures/Accounts Fixtures/ValidAccounts.json")
const InvalidAccounts = require("../fixtures/Accounts Fixtures/InvalidAccounts.json")

describe("Home functions",()=>{
    beforeEach(()=>{
        cy.visit("")
    })

    it("Show the page",()=>{
        cy.url().should("be.equal", "https://www.saucedemo.com/")
    })

    describe("Accounts validations",()=>{
        describe("Valid Accounts",()=>{
            ValidAccounts.forEach((account)=>{
                it(account.name,()=>{
                    LoginPage.Login(account.userName, account.password)
                    if(account.name === "the account should have problems(bad products image)"){
                        InventoryPage.elements.productsCards().find("img").each(($element)=>{
                            expect($element).to.have.attr("src", account.output) 
                        })
                    }else{
                        InventoryPage.elements.productTitle().should("have.text", account.output)
                    }
                })
            })

            afterEach(()=>{
                InventoryPage.logout()
            })
    })
        describe("Invalid Accounts",()=>{
            InvalidAccounts.forEach((account)=>{
                it(account.name,()=>{
                    LoginPage.Login(account.userName, account.password)
                    LoginPage.elements.errorMessage().should("have.text", account.output)
                })
            })
        })


    })

})