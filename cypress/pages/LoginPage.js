class LoginPage{

    elements={
        userNameInput: ()=> cy.get("[data-test = username]"),
        passwordInput: ()=> cy.get("[data-test = password]"),
        loginButton: ()=> cy.get("[data-test = login-button]"),
        errorMessage: ()=> cy.get("[data-test = error]"),
    }

    Login(userName, password){
        if(userName) this.elements.userNameInput().type(userName)
        if(password) this.elements.passwordInput().type(password)
        this.elements.loginButton().click()
    }
}

module.exports = new LoginPage();