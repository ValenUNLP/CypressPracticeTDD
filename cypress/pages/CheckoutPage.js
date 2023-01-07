class CheckoutPage{
    elements={
        nameInput: ()=> cy.get("input[data-test = firstName]"),
        lastNameInput: ()=> cy.get("input[data-test = lastName]"),
        zipInput: ()=> cy.get("input[data-test = postalCode]"),
        continueButton: ()=> cy.get("#continue"),
        cartsItems: ()=> cy.get("div.cart_item"),
        totalPrice: ()=> cy.get("div.summary_subtotal_label"),
        finishButton: ()=> cy.get("button.btn.btn_action"),
        orderHeader: ()=> cy.get("h2.complete-header")
    }
    completeForm(name, lastName, zip){
        this.elements.nameInput().type(name)
        this.elements.lastNameInput().type(lastName)
        this.elements.zipInput().type(zip)

        this.elements.continueButton().click()
    }
}

module.exports = new CheckoutPage()