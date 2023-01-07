import LoginPage from "../../pages/LoginPage"
import InventoryPage from "../../pages/InventoryPage"
import DetailsPage from "../../pages/DetailsPage"
const Users = require("../../fixtures/Accounts Fixtures/ValidAccounts.json")
const User = Users[0]


describe("Product Detail Function",()=>{
    beforeEach(()=>{
        cy.visit("")
        LoginPage.Login(User.userName, User.password)
    })
    it("should show a product detail",()=>{
        InventoryPage.elements.productsCards().eq(1).then($product=>{
            const productName = $product.find("div.inventory_item_name").text()  
            $product.find("div.inventory_item_name").click()
            cy.task("log", productName)
            DetailsPage.elements.productDetail().find("div.inventory_details_name").should("have.text", productName)
        })
    })

    it("should go to home(product detail button)",()=>{
        InventoryPage.elements.productsCards().eq(1).find("div.inventory_item_name").click()
        DetailsPage.elements.productDetailBackButton().click()
        cy.url().should("be.eq", "https://www.saucedemo.com/inventory.html")
    })

    it("should go to home(all item button)",()=>{
        InventoryPage.elements.productsCards().eq(1).find("div.inventory_item_name").click()
        InventoryPage.elements.menuButton().click()
        InventoryPage.elements.allItemnsMenuOption().click()
        cy.url().should("be.eq", "https://www.saucedemo.com/inventory.html")
    })
})