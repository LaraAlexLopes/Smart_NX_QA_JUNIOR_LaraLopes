import { navigateTo, typeIntoField, clickElement, assertElementCondition } from '../Helpers'

class HomePage {
  elements = {
    searchBox: () => cy.get('input[placeholder="Search"]'),
    menuItem: () => cy.get('span[class="oxd-text oxd-text--span oxd-main-menu-item--name"]'),
    title: () => cy.get('h6[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]'),
    userDropDown: () => cy.get('span[class="oxd-userdropdown-tab"]'),
    logOut: () => cy.get('a[href="/web/index.php/auth/logout"]'),
  }

  search(element) {
    typeIntoField(this.elements.searchBox, element)
    this.elements.menuItem().contains(element).click()
  }

  locate(element){
    typeIntoField(this.elements.searchBox, element)
    this.elements.menuItem().contains(element)
  }

  cleanSearch() {
    clearField(this.elements.searchBox)          
    assertElementCondition(this.elements.searchBox, 'have.value', '') 
  }

  assertElement(selector, condition, expectedValue) {
    assertElementCondition(selector, condition, expectedValue)
  }

}

export default new HomePage()

