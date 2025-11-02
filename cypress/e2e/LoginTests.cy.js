import LoginPage from '../support/PageObjects/LoginPage'
import HomePage from "../support/PageObjects/HomePage";
import LogOutPage from '../support/PageObjects/LogOutPage';

describe('Login bem-sucedido na Orange HRM', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
    LoginPage.navigateToLogin()
  });
  
  afterEach(() => {
      LogOutPage.performLogout()
      LogOutPage.assertLogoutSuccess()
  });
  

  it('DADO que o cliente acesse a página de login da Orange HRM QUANDO preenche os campos com dados válidos ENTÃO o login deve ser concluído com sucesso', () => {
    LoginPage.login('Admin', 'admin123')
    HomePage.assertElement(HomePage.elements.title, 'contain', 'Dashboard')
  })
})

describe('Login com falha na Orange HRM', () => {
 beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
    LoginPage.navigateToLogin()
  });
  
  it('DADO que o cliente acesse a página de login da Orange HRM QUANDO não preenche os campos ENTÃO o login não deve ser concluído', () => {
    LoginPage.login(' ', ' ')
    HomePage.assertElement('span[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]', 'contain', 'Required')
  })


  it('DADO que o cliente acesse a página de login da Orange HRM QUANDO preenche os campos com dados inválidos ENTÃO o login não deve ser concluído', () => {
    LoginPage.login('UsuarioErrado', 'SenhaErrada')
    HomePage.assertElement('p[class="oxd-text oxd-text--p oxd-alert-content-text"]', 'have.text', 'Invalid credentials')
  })
})