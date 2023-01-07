class DetailPage{
    elements = {
        productDetail: ()=> cy.get("div.inventory_details"),
        productDetailBackButton: ()=> cy.get("button[data-test= back-to-products ]"),
        productDetailAddButton: ()=> cy.get("button[data-test = add-to-cart-sauce-labs-backpack]")
    }
}

module.exports = new DetailPage()