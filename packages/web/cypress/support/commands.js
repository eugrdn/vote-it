const sizesFile = 'sizes';

Cypress.Commands.add('device', size =>
  cy.task('device', sizesFile).then(config =>
    // TODO: switch to maxWidth
    cy.viewport(config[sizesFile][size].minWidth, Cypress.config('viewportHeight')),
  ),
);

Cypress.Commands.add('openOnDevice', (size, url, options) => cy.device(size).visit(url, options));
