/// <reference types="../support" />

// TODO use typescript

// TODO: use from /navigation
const Href = {
  Home: '/',
  Polls: '/polls',
  Poll: '/poll/[id]',
  Vote: '/poll/[id]/vote',
};

describe('Navigation', () => {
  const pages = [Href.Home, Href.Polls, Href.Poll.replace('[id]', 'new')];

  context('mobile device', () => {
    testTopNavigationMobile(pages);
    testCreatePollLink('mobile');
  });

  context('desktop device', () => {
    testTopNavigationDesktop(pages);
    testCreatePollLink('desktop');
  });
});

function testTopNavigationMobile(hrefs) {
  context('top navigation', () => {
    hrefs.forEach(href => {
      context(`page ${href}`, () => {
        beforeEach(() => {
          cy.openOnDevice('mobile', url(href));
        });

        testAuthButtons();

        context('left sidebar: links to main pages', () => {
          it('should be closed by default', () => {
            cy.get('.sidebar').should('not.have.class', 'active');
          });

          it('should become opened by click on burger link', () => {
            cy.get('.menu.fixed > a')
              .click()
              .get('.sidebar')
              .should('not.have.class', 'active');
          });

          it('should have link to / (home) page', () => {
            cy.get('.menu.fixed > a')
              .click()
              .get(`a[href="${Href.Home}"]`)
              .should('exist')
              .should('have.text', 'Home')
              .invoke('attr', 'href')
              .then(href => cy.openOnDevice('mobile', url(href)))
              .location()
              .should(({pathname}) => expect(pathname).to.eq(Href.Home));
          });

          it('should have link to /polls page', () => {
            cy.get('.menu.fixed > a')
              .click()
              .get(`a[href="${Href.Polls}"]`)
              .should('exist')
              .should('have.text', 'Polls')
              .invoke('attr', 'href')
              .then(href => cy.openOnDevice('mobile', url(href)))
              .location()
              .should(({pathname}) => expect(pathname).to.eq(Href.Polls));
          });
        });
      });
    });
  });
}

function testTopNavigationDesktop(pages) {
  context('top navigation', () => {
    pages.forEach(href => {
      context(`page ${href}`, () => {
        beforeEach(() => {
          cy.openOnDevice('desktop', url(href));
        });

        testAuthButtons();

        context('left navigation: links to main pages', () => {
          it('should have 2 links in total', () => {
            cy.get('.menu')
              .find('a')
              .should('have.length', 2);
          });

          it('should have link to / (home) page', () => {
            cy.get(`a[href="${Href.Home}"]`)
              .should('exist')
              .should('have.text', 'Home')
              .invoke('attr', 'href')
              .then(href => cy.openOnDevice('desktop', url(href)))
              .location()
              .should(({pathname}) => expect(pathname).to.eq(Href.Home));
          });

          it('should have link to /polls page', () => {
            cy.get(`a[href="${Href.Polls}"]`)
              .should('exist')
              .should('have.text', 'Polls')
              .invoke('attr', 'href')
              .then(href => cy.openOnDevice('desktop', url(href)))
              .location()
              .should(({pathname}) => expect(pathname).to.eq(Href.Polls));
          });
        });
      });
    });
  });
}

function testAuthButtons() {
  context('right navigation: auth buttons', () => {
    describe('not logged/signed in', () => {
      it('should have 2 buttons in total', () => {
        cy.get('.right.menu')
          .find('button')
          .should('have.length', 2);
      });

      it('should have login button', () => {
        cy.get('button')
          .contains('Log In')
          .should('exist');
      });

      it('should have signup button', () => {
        cy.get('button')
          .contains('Sign Up')
          .should('exist');
      });
    });

    describe.skip('logged/signed in', () => {
      before(() => {
        cy.logout().login();
      });

      after(() => {
        cy.logout();
      });

      it('should have 1 signout button in total', () => {
        cy.get('.right.menu')
          .find('button')
          .should('have.length', 1)
          .contains('Sign Out')
          .should('exist');
      });
    });
  });
}

function testCreatePollLink(device) {
  context('create poll link', () => {
    it('should exist with proper title', () => {
      cy.openOnDevice(device, url())
        .get(`a[href="${Href.Poll.replace('[id]', 'new')}"]`)
        .should('exist')
        .should('have.text', 'Create a poll');
    });

    it('should navigate to new poll page', () => {
      const newPollHref = Href.Poll.replace('[id]', 'new');

      cy.openOnDevice(device, url())
        .get(`a[href="${newPollHref}"]`)
        .invoke('attr', 'href')
        .then(href => cy.openOnDevice(device, url(href)))
        .location()
        .should(({pathname}) => expect(pathname).to.eq(newPollHref));
    });
  });
}

function url(href = Href.Home) {
  return `http://localhost:3000${href}`;
}
