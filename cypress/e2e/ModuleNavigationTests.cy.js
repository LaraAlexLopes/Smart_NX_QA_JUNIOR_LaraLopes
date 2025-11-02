import LoginPage from '../support/PageObjects/LoginPage'
import HomePage from "../support/PageObjects/HomePage";
import LogOutPage from '../support/PageObjects/LogOutPage'

describe('Navegação e pesquisa de módulos', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
    LoginPage.navigateToLogin()
    LoginPage.login('Admin', 'admin123')
        
    HomePage.assertElement(HomePage.elements.title, 'contain', 'Dashboard')
  });
  
  afterEach(() => {
     LogOutPage.performLogout()
     LogOutPage.assertLogoutSuccess()
  });
  
  it('Dado que o usuário esteja logado no sistema Quando ele pesquisar pelo módulo "PIM" Então o sistema deve exibir o módulo "PIM"', () => {
    HomePage.locate('PIM')
  })

  it('Dado que o usuário esteja logado no sistema Quando ele clicar no módulo "PIM" Então o módulo "PIM" deve ser aberto', () => {
    HomePage.search('PIM')
    HomePage.assertElement(HomePage.elements.title, 'contain', 'PIM')
  })

  it('Dado que o usuário esteja logado no sistema Quando ele pesquisar pelo módulo "Leave" Então o sistema deve exibir o módulo "Leave"', () => {
    HomePage.search('Leave')
    HomePage.assertElement(HomePage.elements.title, 'contain', 'Leave')
  })

  it('Dado que o usuário tenha pesquisado por um módulo Quando ele apagar a pesquisa Então o campo de pesquisa deve ficar vazio E nenhum módulo filtrado deve ser exibido', () => {
    HomePage.search('Leave');
    HomePage.assertElement(HomePage.elements.title, 'contain', 'Leave');
    HomePage.cleanSearch();
  })

})