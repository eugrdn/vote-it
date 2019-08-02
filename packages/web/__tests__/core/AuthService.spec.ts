import firebase from 'firebase';
import {AuthService} from '../../src/core/auth';
import {FirebaseService} from '../../src/core/firebase';

jest.mock('firebase');
jest.mock('~/utils/fingerprint');

describe('Core: AuthService', () => {
  let mockFirebase: FirebaseService;
  let sut: AuthService;
  let authStatusListenerMock: (user: firebase.User | null) => firebase.Unsubscribe;
  let authUnsubscribe: firebase.Unsubscribe;

  beforeEach(() => {
    mockFirebase = {
      auth: firebase.auth(),
      firestore: firebase.firestore(),

      createCustomUser: jest.fn(),
      deleteUser: jest.fn(),
      getCustomUserByFingerprint: jest.fn(),
      getCustomUserById: jest.fn(),
      getFirebaseUser: jest.fn(),
      getUser: jest.fn(),
      getQueryValue: jest.fn(),
      getSnapshotData: jest.fn(),
      path: jest.fn(),
    } as any;

    authStatusListenerMock = jest.fn();
    authUnsubscribe = mockFirebase.auth.onAuthStateChanged(authStatusListenerMock);

    sut = new AuthService(mockFirebase);
  });

  afterEach(() => {
    authUnsubscribe();
  });

  const email = 'john@snow';
  const password = 'kingofthenorth';

  describe('#signupAnonymously', () => {
    it('should use firebase native #signInAnonymously and trigger #onAuthStateChanged', async () => {
      const spy = jest.spyOn(mockFirebase.auth, 'signInAnonymously');

      await sut.signupAnonymously();

      expect(spy).toHaveBeenCalled();
      expect(authStatusListenerMock).toHaveBeenCalledWith({isAnonymous: true});
    });

    it('should create new user based on new firebase user and prev user', async () => {
      const prevUser: any = {};
      const credentials: any = {user: {}};

      mockFirebase.auth.signInAnonymously = jest.fn(() => credentials);
      (mockFirebase.getCustomUserByFingerprint as jest.Mock).mockReturnValue(prevUser);

      const spy = jest.spyOn(mockFirebase, 'createCustomUser');

      await sut.signupAnonymously();

      expect(spy).toHaveBeenCalledWith(credentials.user, prevUser);
    });

    it('should delete prev user if it was anonymous', async () => {
      const anonUser: any = {id: '1', isAnonymous: true};
      const signedUser: any = {id: '2', isAnonymous: false};

      const deleteUserSpy = jest.spyOn(mockFirebase, 'deleteUser');
      const getUserSpy = jest
        .spyOn(mockFirebase, 'getCustomUserByFingerprint')
        .mockReturnValueOnce(anonUser)
        .mockReturnValueOnce(signedUser);

      await sut.signupAnonymously();

      expect(getUserSpy).toHaveBeenCalled();
      expect(deleteUserSpy).toHaveBeenCalledWith(anonUser.id);
      deleteUserSpy.mockClear();

      await sut.signupAnonymously();

      expect(deleteUserSpy).not.toHaveBeenCalled();
    });
  });

  describe('#signup', () => {
    it('should use firebase native #createUserWithEmailAndPassword and trigger #onAuthStateChanged', async () => {
      const spy = jest.spyOn(mockFirebase.auth, 'createUserWithEmailAndPassword');

      await sut.signup(email, password);

      expect(spy).toHaveBeenCalled();
      // TODO: expect(authStatusListenerMock).toHaveBeenCalledWith({email, isAnonymous: false});
    });

    it('should create new user based on new firebase user and prev user and update user profile', async () => {
      const prevUser: any = {};
      const credentials: any = {user: {updateProfile: jest.fn()}};

      mockFirebase.auth.createUserWithEmailAndPassword = jest.fn(() => credentials);
      (mockFirebase.getUser as jest.Mock).mockReturnValue(prevUser);

      const spy = jest.spyOn(mockFirebase, 'createCustomUser');

      const userInfo: any = {};
      await sut.signup(email, password, userInfo);

      expect(spy).toHaveBeenCalledWith(credentials.user, prevUser);
      expect(credentials.user.updateProfile).toHaveBeenCalledWith(userInfo);
    });

    it('should delete prev user if it was anonymous', async () => {
      const anonUser: any = {id: '1', isAnonymous: true};
      const signedUser: any = {id: '2', isAnonymous: false};

      const deleteUserSpy = jest.spyOn(mockFirebase, 'deleteUser');
      const getUserSpy = jest
        .spyOn(mockFirebase, 'getUser')
        .mockReturnValueOnce(anonUser)
        .mockReturnValueOnce(signedUser);

      await sut.signup(email, password);

      expect(getUserSpy).toHaveBeenCalled();
      expect(deleteUserSpy).toHaveBeenCalledWith(anonUser.id);
      deleteUserSpy.mockClear();

      await sut.signup(email, password);

      expect(deleteUserSpy).not.toHaveBeenCalled();
    });
  });

  describe('#signout', () => {
    it('should use firebase native #signOut and trigger #onAuthStateChanged', async () => {
      const spy = jest.spyOn(mockFirebase.auth, 'signOut');

      await sut.signout();

      expect(spy).toHaveBeenCalled();
      expect(authStatusListenerMock).toHaveBeenCalledWith(null);
    });
  });

  describe('#login', () => {
    it('should use firebase native #signInWithEmailAndPassword and trigger #onAuthStateChanged', () => {
      const spy = jest.spyOn(mockFirebase.auth, 'signInWithEmailAndPassword');

      sut.login(email, password);

      expect(spy).toHaveBeenCalledWith(email, password);
      expect(authStatusListenerMock).toHaveBeenCalledWith({email, isAnonymous: false});
    });
  });
});
