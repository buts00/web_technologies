import React from 'react'
import AddExpense from './AddExpense'

describe('<AddExpense />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AddExpense />)
  })
})