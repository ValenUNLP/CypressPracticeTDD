import LoginPage from "../../pages/LoginPage"
import InventoryPage from "../../pages/InventoryPage"
import ShoppingCart from "../../pages/ShoppingCartPage"
import DetailsPage from "../../pages/DetailsPage"
import ShoppingCartPage from "../../pages/ShoppingCartPage"
import ShoppingCartPage from "../../pages/ShoppingCartPage"
const Users = require("../../fixtures/Accounts Fixtures/ValidAccounts.json")
const User = Users[0]

describe("Shoping cart functions",()=>{
    beforeEach(()=>{
        cy.visit("")
        LoginPage.Login(User.userName, User.password)
    })

    it("add product(card button)",()=>{
        InventoryPage.elements.productsCards().eq(0).then(($product)=>{
            const productName = $product.find("div.inventory_item_name").text()
            $product.find("button").click()
            const value = $product.find("button").text()
            expect(value).to.eq("Remove")
            InventoryPage.elements.shoppingCart().click()
            
            ShoppingCart.elements.shoppingCartItem().then(($item)=>{
                const shoppingCartProductName = $item.find("div.inventory_item_name").text()
                expect(shoppingCartProductName).to.eq(productName)
            })
        })

        InventoryPage.elements.shoppingCart().then(($cart)=>{
            const val = $cart.find("span").text()
            expect(val).to.eq("1")
        })

    })
    it("add product(detail button)",()=>{
        InventoryPage.elements.productsCards().eq(0).then(($product)=>{
            const productName = $product.find("div.inventory_item_name").text()
            $product.find("img").click()
            DetailsPage.elements.productDetailAddButton().click()
            InventoryPage.elements.shoppingCart().click()
            
            ShoppingCart.elements.shoppingCartItem().then(($item)=>{
                const shoppingCartProductName = $item.find("div.inventory_item_name").text()
                expect(shoppingCartProductName).to.eq(productName)
            })
        })

        InventoryPage.elements.shoppingCart().then(($cart)=>{
            const val = $cart.find("span").text()
            expect(val).to.eq("1")
        }) 
    })

    it("should add two products",()=>{
        InventoryPage.elements.productsCards().eq(0).find("button").click()
        InventoryPage.elements.productsCards().eq(1).find("button").click()
        InventoryPage.elements.shoppingCart().then(($cart)=>{
            const val = $cart.find("span").text()
            expect(val).to.eq("2")
        }) 

        InventoryPage.elements.shoppingCart().click()
        ShoppingCart.elements.shoppingCartItem().should("have.length", 2)
    })

    it("should remove a product",()=>{
        InventoryPage.elements.productsCards().eq(0).find("button").click()
        InventoryPage.elements.shoppingCart().click()
        ShoppingCart.elements.shoppingCartItem().should("have.length", 1)

        ShoppingCart.elements.shoppingCartItem().find("button").click()
        ShoppingCart.elements.shoppingCartItem().should("have.length", 0)
        InventoryPage.elements.shoppingCart().then(($cart)=>{
            const val = $cart.find("span").text()
            expect(val).to.eq("")
        }) 
    })
    it("should remove a product(reset app state button)",()=>{
        InventoryPage.elements.productsCards().eq(0).find("button").click()
        InventoryPage.elements.shoppingCart().click()
        ShoppingCart.elements.shoppingCartItem().should("have.length", 1)

        InventoryPage.elements.menuButton().click()
        InventoryPage.elements.resetAppStateMenuOption().click()
        InventoryPage.elements.shoppingCart().click()
        ShoppingCart.elements.shoppingCartItem().should("have.length", 0)

        InventoryPage.elements.shoppingCart().then(($cart)=>{
            const val = $cart.find("span").text()
            expect(val).to.eq("")
        })
    })
    it("should buy a product",()=>{
        InventoryPage.elements.productsCards().eq(0).find("button").click()
        InventoryPage.elements.productsCards().eq(1).find("button").click()

        InventoryPage.elements.shoppingCart().click()

        ShoppingCart.elements.shoppingCartItem().then(($item)=>{
            const costItem1 = $item.eq(0).find("div.inventory_item_price").text()
            const costItem2 = $item.eq(1).find("div.inventory_item_price").text()
            
            const total = Number(costItem1.slice(1)) + Number(costItem2.slice(1))
            ShoppingCart.elements.checkoutButton().click()
            ShoppingCartPage.completeForm("Valentin","Banegas", 6640)
            ShoppingCartPage.elements.cartsItems().should("have.length", 2)
            ShoppingCartPage.elements.totalPrice().then($price =>{
                const totalPrice = Number($price.text().slice(13))
                expect(totalPrice).to.eq(total)
            })
            ShoppingCartPage.elements.finishButton().click()

            ShoppingCartPage.elements.orderHeader().should("be.visible")
            .and("have.text", "THANK YOU FOR YOUR ORDER")
        })

    })
})