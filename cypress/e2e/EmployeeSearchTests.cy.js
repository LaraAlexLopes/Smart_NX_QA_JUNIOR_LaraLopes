import LoginPage from '../support/PageObjects/LoginPage'
import HomePage from "../support/PageObjects/HomePage";
import PimPage from '../support/PageObjects/PimPage';
import LogOutPage from '../support/PageObjects/LogOutPage'

describe('Pesquisa de employee no módulo PIM', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
    LoginPage.navigateToLogin()
    LoginPage.login('Admin', 'admin123')
    
    HomePage.assertElement(HomePage.elements.title, 'contain', 'Dashboard')
    HomePage.search('PIM')
    HomePage.assertElement(HomePage.elements.title, 'contain', 'PIM')
    
  });
  
  afterEach(() => {
    LogOutPage.performLogout()
    LogOutPage.assertLogoutSuccess()
  });

  it('Dado que o usuário esteja logado no módulo "PIM" Quando ele digitar o ID de um employee existente no campo de pesquisa e pesquisar Então os resultados devem exibir o employee correspondente ao ID pesquisado', () => {
    let id = '';
    PimPage.addEmployee('PrimeiroNomeUsuario','UltimoNomeUsuario')
      cy.get('input[class="oxd-input oxd-input--active"]').eq(1).invoke('val').then((id) => {
          PimPage.saveEmployee('PrimeiroNomeUsuario');
          PimPage.selectTab('Employee List');
          PimPage.searchEmployeeById(id);
          PimPage.assertElement('span[class="oxd-text oxd-text--span"]', 'contain', '(1) Record Found');
      });
  })

  it('Dado que o usuário esteja logado no módulo "PIM" Quando ele digitar o nome de um employee existente no campo de pesquisa e pesquisar Então os resultados devem exibir o employee correspondente ao nome pesquisado', () => {

    PimPage.addEmployee('PrimeiroNomeUsuario','UltimoNomeUsuario')
    PimPage.saveEmployee('PrimeiroNomeUsuario');
    PimPage.selectTab('Employee List');
    PimPage.searchEmployeeByName('PrimeiroNomeUsuario');
    PimPage.assertElement('span[class="oxd-text oxd-text--span"]', 'contain', ') Records Found');
  })


  it('Dado que o usuário esteja logado no módulo "PIM" Quando ele digitar um ID que não exista no campo de pesquisa e pesquisar Então a aplicação deve exibir a mensagem "No Records Found"', () => {
     let id = '';
      PimPage.addEmployee('PrimeiroNomeUsuario','UltimoNomeUsuario')
      cy.get('input[class="oxd-input oxd-input--active"]').eq(1).invoke('val').then((id) => {
          PimPage.saveEmployee('PrimeiroNomeUsuario');
          PimPage.selectTab('Employee List');
          PimPage.searchEmployeeById(id);
          PimPage.assertElement('span[class="oxd-text oxd-text--span"]', 'contain', '(1) Record Found');
          PimPage.deleteEmployee();
          PimPage.confirmDelete();
          PimPage.assertElement('span[class="oxd-text oxd-text--span"]', 'contain', 'No Records Found');
      });
  })

  it('Dado que o usuário esteja logado no módulo "PIM" Quando ele digitar um nome que não exista no campo de pesquisa e pesquisar Então a aplicação deve exibir a mensagem "No Records Found"', () => {
    PimPage.addEmployee('Usuario Inexistente','UltimoNomeUsuario')
    PimPage.saveEmployee('Usuario Inexistente');
    PimPage.selectTab('Employee List');
    PimPage.searchEmployeeByName('Usuario Inexistente');
    PimPage.assertElement('span[class="oxd-text oxd-text--span"]', 'contain', '(1) Record Found');
    PimPage.deleteEmployee();
    PimPage.confirmDelete();
    PimPage.searchEmployeeByName('Usuario Inexistente');
    PimPage.assertElement('span[class="oxd-text oxd-text--span"]', 'contain', 'No Records Found');
  })

})