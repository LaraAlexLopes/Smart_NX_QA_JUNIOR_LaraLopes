import LoginPage from '../support/PageObjects/LoginPage'
import HomePage from "../support/PageObjects/HomePage";
import PimPage from '../support/PageObjects/PimPage';
import LogOutPage from '../support/PageObjects/LogOutPage'

describe('Cadastro de employee no módulo PIM', () => {
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

  it('Dado que o usuário esteja logado no módulo "PIM" Quando ele acessar a tela de listagem de employees Então o botão "+ Add" deve estar visível e habilitado', () => {
    PimPage.foundAddEmployee('PrimeiroNomeUsuario','UltimoNomeUsuario')
  })

  it('Dado que o usuário esteja logado no módulo "PIM" Quando ele clicar no botão "+ Add" Então a tela de cadastro de employee deve ser exibida com o título "Add Employee"', () => {
    PimPage.addEmployee('PrimeiroNomeUsuario','UltimoNomeUsuario')
  })

  it('Dado que o usuário esteja na tela de cadastro de employee Quando ele não preencher os campos de nome e tenta salvar Então deve ser exibida uma mensagem de erro informando que os campos são obrigatórios', () => {
    PimPage.addEmployee(' ',' ')
    PimPage.assertElement('span[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]', 'contain', 'Required')
  })

  it('Dado que o usuário esteja na tela de cadastro de employee  Quando o usuário tentar cadastrar outro employee com um id já existente Então deve ser exibida uma mensagem de erro informando que o Employee ID já existe', () => {
    let id = '';
    PimPage.addEmployee('UltimoNomeUsuario','UltimoNomeUsuario')
    
    cy.get('input[class="oxd-input oxd-input--active"]').eq(1).invoke('val').then((id) => {
      PimPage.saveEmployee();
      PimPage.selectTab('Employee List');
      PimPage.addEmployee('PrimeiroNomeUsuario2','UltimoNomeUsuario2')
      PimPage.enterEmployeeId(id)
      PimPage.assertElement('span[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]', 'contain', 'Employee Id already exists')
    });

  })

  it('Dado que o usuário esteja na tela de cadastro de employee Quando ele preencher os campos obrigatórios  Então o employee deve ser cadastrado com sucesso', () => {
      PimPage.addEmployee('PrimeiroNomeUsuario','UltimoNomeUsuario')
      PimPage.saveEmployee('PrimeiroNomeUsuario');
  })

})