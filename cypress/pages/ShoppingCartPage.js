class ShoppingCart{
    elements = {
        shoppingCartItem : ()=> cy.get("div.cart_item"),
        checkoutButton: ()=> cy.get("button[data-test = checkout]")
    }
}

module.exports = new ShoppingCart()