import firebase from 'firebase';
import {FirebaseService} from '../../src/core/firebase';

jest.mock('firebase');
jest.mock('~/utils/fingerprint');

describe.only('Core: FirebaseService', () => {
  let sut: FirebaseService;

  beforeEach(() => {
    firebase.apps = [];

    sut = new FirebaseService(firebase);
  });

  const id = 'id';
  const fingerprint = 'fingerprint';

  describe('#getFirebaseUser', () => {
    it('should get firebase user via native firebase auth object', () => {
      const user: any = {};
      sut.auth.currentUser = user;

      expect(sut.getFirebaseUser()).toBe(user);
    });
  });

  // TODO #getUser tests
  describe.skip('#getUser', () => {});

  // TODO #getCustomUserByFingerprint tests
  describe.skip('#getCustomUserByFingerprint', () => {});

  // TODO
  describe.skip('#getCustomUserById', () => {
    it('should get user from firestore by id', async () => {
      expect(await sut.getCustomUserById(id)).toBeUndefined();

      const newUser = {id};
      await sut.firestore.collection('users').add(newUser);
      const user = await sut.getCustomUserById(id);

      expect(user!.id).toBe(newUser.id);
    });
  });

  describe('#createCustomUser', () => {
    it('should create custom user based on previous anonymous user', async () => {
      const firebaseUser: any = {uid: id};
      const customInfo = {polls: [], votes: []};
      const prevUser: any = {isAnonymous: true, ...customInfo};
      const newUser = {id, ...customInfo};

      await sut.createCustomUser(firebaseUser, prevUser);
      const user = await sut.getCustomUserById(id);

      expect(user!.id).toBe(newUser.id);
      expect(user!.polls).toEqual(newUser.polls);
      expect(user!.votes).toEqual(newUser.votes);
    });

    it("should create custom user without the base if previous user non-anonymous or didn't exist", async () => {
      const firebaseUser: any = {uid: id};
      const customInfo = {polls: [], votes: []};
      const prevUser: any = {isAnonymous: false, ...customInfo};
      const newUser = {id, ...customInfo};

      await sut.createCustomUser(firebaseUser, prevUser);
      const user = await sut.getCustomUserById(id);

      expect(user!.id).toBe(newUser.id);
      expect(user!.polls).not.toEqual(newUser.polls);
      expect(user!.votes).not.toEqual(newUser.votes);
    });

    describe('fingerprint property for new user', () => {
      it('should set fingerprint if current user is anonymous: from prev user (if anonymous) or recreated', async () => {
        const firebaseUser: any = {uid: id, isAnonymous: true};
        let prevUser: any = {isAnonymous: true};
        let user: any;

        await sut.createCustomUser(firebaseUser, prevUser);
        user = await sut.getCustomUserById(id);

        expect(user.fingerprint).toBe(fingerprint);

        prevUser = {...prevUser, fingerprint: fingerprint + 'new'};
        await sut.deleteUser(id);
        await sut.createCustomUser(firebaseUser, prevUser);
        user = await sut.getCustomUserById(id);

        expect(user.fingerprint).toBe(prevUser.fingerprint);
      });

      it("should't set fingerprint isn't anonymous", async () => {
        const firebaseUser: any = {uid: id, isAnonymous: false};
        let prevUser: any = {isAnonymous: false};
        let user: any;

        await sut.createCustomUser(firebaseUser, prevUser);
        user = await sut.getCustomUserById(id);

        expect(user.fingerprint).toBeNull();

        prevUser = {...prevUser, fingerprint};
        await sut.deleteUser(id);
        await sut.createCustomUser(firebaseUser, prevUser);
        user = await sut.getCustomUserById(id);

        expect(user.fingerprint).toBeNull();
      });
    });
  });

  describe('#deleteUser', () => {
    it('should delete user from firestore by id', async () => {
      const user = {id};

      sut.firestore.collection('users').add(user);
      sut.deleteUser(id);

      expect(await sut.getCustomUserById(id)).toBeUndefined();
    });
  });
});
