/// <reference types="cypress" />

type Action = 'set' | 'push' | 'update' | 'remove';
type ActionPath = string;
type Options = any;

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Set viewport sizes according to device size
     * @example
     * cy.device('mobile')
     */
    device(size: 'mobile' | 'desktop'): Chainable<any>;
    /**
     * Set viewport sizes according to device size
     * @example
     * cy.device('mobile', 'http://localhost:3000')
     */
    openOnDevice(
      size: 'mobile' | 'desktop',
      url: string,
      options?: Partial<Cypress.VisitOptions> | undefined,
    ): Chainable<any>;

    /**
     * cypress-firebase
     */

    /**
     * Login to Firebase auth using FIREBASE_AUTH_JWT environment variable which is generated using firebase-admin authenticated with serviceAccount during build:testConfig phase.
     * @example
     * cy.login()
     */
    login(): Chainable<any>;
    /**
     * Log out of Firebase instance
     * @example
     * cy.logout()
     */
    logout(): Chainable<any>;
    /**
     * Call Real Time Database path with some specified action. Authentication is through FIREBASE_TOKEN since firebase-tools is used (instead of firebaseExtra).
     * @example
     * const fakeProject = { some: 'data' }
     * cy.callRtdb('set', 'projects/ABC123', fakeProject)
     */
    callRtdb(action: Action, path: ActionPath, options?: Options): Chainable<any>;
    /**
     * Call Firestore instance with some specified action. Authentication is through serviceAccount.json since it is at the base level. If using delete, auth is through FIREBASE_TOKEN since firebase-tools is used (instead of firebaseExtra).
     * @example
     * cy.callFirestore('set', 'project/test-project', 'fakeProject.json')
     */
    callFirestore(action: Action, path: ActionPath, options?: Options): Chainable<any>;
  }
}
