import { navigateTo, typeIntoField, clickElement, assertElementCondition } from '../Helpers'

class LoginPage {
  selectors = {
    username: 'input[name="username"]',
    password: 'input[name="password"]',
    loginButton: 'button',
    title: 'h5[class="oxd-text oxd-text--h5 orangehrm-login-title"]'
  }

  navigateToLogin() {
    navigateTo('/login')
  }

  login(usuario, senha) {
    typeIntoField(this.selectors.username, usuario)
    typeIntoField(this.selectors.password, senha)
    clickElement(this.selectors.loginButton)
  }

  assertElement(selector, condition, expectedValue) {
    assertElementCondition(selector, condition, expectedValue)
  }
}

export default new LoginPage()

