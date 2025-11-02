import { navigateTo, typeIntoField, clickElement, assertElementCondition, assertElementExists } from '../Helpers'
class PimPage {
  elements = {
    addButton: () => cy.get('button[class="oxd-button oxd-button--medium oxd-button--secondary"]'),
    employeeTitle: () => cy.get('h6[class="oxd-text oxd-text--h6 orangehrm-main-title"]'),
    firstName: () => cy.get('input[name="firstName"]'),
    lastName: () => cy.get('input[name="lastName"]'),
    nameTitle: () => cy.get('a[class="orangehrm-tabs-item --active"]'),
    employeeIdInput: () => cy.get('input[class="oxd-input oxd-input--active"]').eq(1),
    employeeNameInput: () => cy.get('input[placeholder="Type for hints..."]').eq(0),
    saveButton: () => cy.get('button[class="oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space"]'),
    employeeListTab: () => cy.get('a[class="oxd-topbar-body-nav-tab-item"]').eq(0),
    searchEmployeeId: () => cy.get('button[class="oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space"]'),
    searchButton: () => cy.get('button.orangehrm-left-space'),
    deleteButton: () => cy.get('button[class="oxd-icon-button oxd-table-cell-action-space"]').eq(1),
    confirmNo: () => cy.get('button[class="oxd-button oxd-button--medium oxd-button--ghost orangehrm-button-margin"]'),
    confirmYes: () => cy.contains('button', 'Yes, Delete'),

    recordFound: () => cy.get('span.oxd-text--span')
  }

  foundAddEmployee(){
    clickElement(this.elements.addButton)
    assertElementCondition(this.elements.employeeTitle, 'contain', 'Add Employee')
  }
  
  addEmployee(firstName, lastName) {
    this.elements.addButton().click()
    assertElementCondition(this.elements.employeeTitle, 'contain', 'Add Employee')
    this.elements.firstName().type(firstName)
    this.elements.lastName().type(lastName)
  }

  saveEmployee(firstName) {
    clickElement(this.elements.saveButton)
    assertElementCondition(this.elements.nameTitle, 'contain.text', 'Personal Details')
  }

  enterEmployeeId(id) {
    typeIntoField(this.elements.employeeIdInput, id)
  } 

  selectTab(expectedValue) {
    assertElementCondition(this.elements.employeeListTab, 'be.visible', expectedValue)
    assertElementCondition(this.elements.employeeListTab, 'contain', expectedValue)
    clickElement(this.elements.employeeListTab)
  }

  assertElement(selector, condition, expectedValue) {
      assertElementCondition(selector, condition, expectedValue)
  }

  searchEmployeeById(employeeId)  {
    typeIntoField(this.elements.employeeIdInput, employeeId)
    clickElement(this.elements.searchEmployeeId)
  }

  searchEmployeeByName(employeeName)  {
    typeIntoField(this.elements.employeeNameInput, employeeName)
    clickElement(this.elements.searchEmployeeId)
  }

  deleteEmployee(){
    clickElement(this.elements.deleteButton)
    assertElementCondition('p[class="oxd-text oxd-text--p oxd-text--card-title"]','contain', 'Are you Sure?')
  }

  confirmDelete(){
    cy
      .contains('button', 'Yes, Delete')
      .should('be.visible')
      .click({ force: true });

    cy
      .get('p[class="oxd-text oxd-text--p oxd-text--card-title"]', { timeout: 10000 })
      .should('not.exist');
  }

  cancelDelete(){
    cy
      .contains('button', 'No, Cancel')
      .should('be.visible')
      .click({ force: true });

    cy
      .get('p[class="oxd-text oxd-text--p oxd-text--card-title"]', { timeout: 10000 })
      .should('not.exist');
  }
}

export default new PimPage()
