import { clickElement, assertElementCondition, clearField } from '../Helpers'

class LogOutPage {
  selectors = {
    searchInput: 'input[placeholder="Search"]',
    userDropdown: 'span[class="oxd-userdropdown-tab"]',
    logoutButton: 'a[href="/web/index.php/auth/logout"]',
    loginTitle: 'h5[class="oxd-text oxd-text--h5 orangehrm-login-title"]'
  }

  performLogout() {
    clearField(this.selectors.searchInput)
    clickElement(this.selectors.userDropdown)
    clickElement(this.selectors.logoutButton)
  }

  assertLogoutSuccess() {
    assertElementCondition(this.selectors.loginTitle, 'contain', 'Login')
  }
}

export default new LogOutPage()
