import LoginPage from '../support/PageObjects/LoginPage'
import HomePage from "../support/PageObjects/HomePage";
import PimPage from '../support/PageObjects/PimPage';
import LogOutPage from '../support/PageObjects/LogOutPage'

describe('Exclusão de employee no módulo PIM', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
    LoginPage.navigateToLogin()
    LoginPage.login('Admin', 'admin123')

    HomePage.assertElement(HomePage.elements.title, 'contain', 'Dashboard')
    HomePage.search('PIM')
    HomePage.assertElement(HomePage.elements.title, 'contain', 'PIM')

    PimPage.addEmployee('PrimeiroNomeUsuario','UltimoNomeUsuario')
  });
  
  afterEach(() => {
    LogOutPage.performLogout()
    LogOutPage.assertLogoutSuccess()
  });

  it('Dado que o usuário esteja logado no módulo "PIM" E tenha pesquisado o employee a ser excluído Quando ele clicar em deletar Então o employee não deve ser excluído', () => {
    let id = '';
    
    cy.get('input[class="oxd-input oxd-input--active"]').eq(1).invoke('val').then((id) => {
      PimPage.saveEmployee('PrimeiroNomeUsuario');
      PimPage.selectTab('Employee List');
      PimPage.searchEmployeeById(id);
      PimPage.assertElement('span[class="oxd-text oxd-text--span"]', 'contain.text', '(1) Record Found');
      PimPage.deleteEmployee();
      PimPage.cancelDelete();
      PimPage.assertElement('span[class="oxd-text oxd-text--span"]', 'contain.text', '(1) Record Found');

    });
  })

  it('Dado que o usuário esteja logado no módulo "PIM" E tenha pesquisado o employee a ser excluído Quando ele clicar em deletar Então o employee deve ser excluído', () => {
    let id = '';
    
    cy.get('input[class="oxd-input oxd-input--active"]').eq(1).invoke('val').then((id) => {

      PimPage.saveEmployee('PrimeiroNomeUsuario');
      PimPage.selectTab('Employee List');
      PimPage.searchEmployeeById(id);
      PimPage.assertElement('span[class="oxd-text oxd-text--span"]', 'contain.text', '(1) Record Found');
      PimPage.deleteEmployee();
      PimPage.confirmDelete();
      PimPage.assertElement('span[class="oxd-text oxd-text--span"]', 'contain', 'No Records Found');

    });
  })

})