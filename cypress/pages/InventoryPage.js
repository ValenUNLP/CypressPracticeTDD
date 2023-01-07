class InventoryPage{

    elements={
        productTitle: ()=> cy.get("span.title"),
        productsCards: ()=> cy.get("div.inventory_item"),
        menuButton: ()=> cy.get("button#react-burger-menu-btn"),
        logoutMenuOption: ()=> cy.get("a#logout_sidebar_link"),
        aboutMenuOption: () => cy.get("a#about_sidebar_link"),
        allItemnsMenuOption:()=> cy.get("a#inventory_sidebar_link"),
        inventoryMenuOption: ()=> cy.get("a#inventory_sidebar_link"),
        resetAppStateMenuOption: ()=> cy.get("a#reset_sidebar_link"),
        shoppingCart: ()=> cy.get("a.shopping_cart_link"),
    }

    logout(){
        this.elements.menuButton().click()
        this.elements.logoutMenuOption().click()
    }
}

module.exports = new InventoryPage();