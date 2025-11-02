export function navigateTo(path) {
  cy
    .visit(path)
}

export function clickElement(selector){
  cy
    .get(selector)
    .should('be.visible')
    .and('not.be.disabled')  
    .click();
}

export function clearField(selector){
  cy
    .get(selector)
    .clear()
}

export function typeIntoField(selector, text){
  cy
    .get(selector)
    .should('be.visible')
    .clear()
    .type(text)
}

export function assertElementCondition(selector, condition, expectedValue){
    cy
      .get(selector)
      .should(condition,expectedValue);
}

export function assertElementExists(selector, expectedValue){
  cy
    .get(selector)
    .should(expectedValue);
}






