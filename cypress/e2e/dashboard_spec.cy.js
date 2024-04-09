describe('empty spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/reservations', {
      statusCode: 200,
      fixture: 'resy-data'
    })
    .visit('http://localhost:3000')
  });

  it('should load the page with current resys', () => {
    cy.get('.app-title').contains('h1', 'Turing Cafe Reservations')
    cy.get('.resy-container').first().within(() => {
      cy.contains('h3', 'Christie')
      cy.contains('p', '12/29')
      cy.contains('p', '7:00')
      cy.contains('p', 'Number of guests: 12')
    });
    cy.get('.resy-container').last().within(() => {
      cy.contains('h3', 'Khalid')
      cy.contains('p', '5/9')
      cy.contains('p', '7:30')
      cy.contains('p', 'Number of guests: 7')
    }) ;
  });

  it('should show error if data cannot be GET', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/reservations', {
      statusCode: 500
    })
    // cy.get('.error').contains('h2', 'Could not find any reservations.')
  })

  it('should track data in the input fields', () => {
    cy.get('input[name="name"]').type('Harold').should('have.value', 'Harold')
    cy.get('input[name="date"]').type('12/24').should('have.value', '12/24')
    cy.get('input[name="time"]').type('8:00').should('have.value', '8:00')
    cy.get('input[name="number"]').type('6').should('have.value', '6')
  });

  it('should add new resy to the homepage and intercept post request', () => {
    cy.intercept('http://localhost:3001/api/v1/reservations', {
      statusCode: 201,
      fixture: 'post-resy.json'
    })
    cy.get('input[name="name"]').type('Harold').should('have.value', 'Harold')
    cy.get('input[name="date"]').type('12/24').should('have.value', '12/24')
    cy.get('input[name="time"]').type('8:00').should('have.value', '8:00')
    cy.get('input[name="number"]').type('6').should('have.value', '6')
    cy.get('.btn').click()
    cy.get('.resy-container').last().within(() => {
      cy.contains('h3', 'Harold')
      cy.contains('p', '12/24')
      cy.contains('p', '8:00')
      cy.contains('p', 'Number of guests: 6')
    });
  });
});