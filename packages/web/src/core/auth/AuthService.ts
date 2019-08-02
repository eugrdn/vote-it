import {FirebaseService} from '../firebase';

export class AuthService {
  constructor(private firebaseService: FirebaseService) {}

  onAuthStateChanged = this.firebaseService.auth.onAuthStateChanged.bind(this.firebaseService.auth);

  async signupAnonymously() {
    const [prevUser, credentials] = await Promise.all([
      this.firebaseService.getCustomUserByFingerprint(),
      this.firebaseService.auth.signInAnonymously(),
    ]);

    if (credentials.user) {
      await this.firebaseService.createCustomUser(credentials.user, prevUser);
    }

    if (prevUser && prevUser.isAnonymous) {
      await this.firebaseService.deleteUser(prevUser.id);
    }
  }

  async signup(email: string, password: string, userInfo: any = {}) {
    const [prevUser, credentials] = await Promise.all([
      this.firebaseService.getUser(),
      this.firebaseService.auth.createUserWithEmailAndPassword(email, password),
    ]);

    if (credentials.user) {
      await Promise.all([
        this.firebaseService.createCustomUser(credentials.user, prevUser),
        credentials.user.updateProfile(userInfo),
      ]);
    }

    if (prevUser && prevUser.isAnonymous) {
      await this.firebaseService.deleteUser(prevUser.id);
    }
  }

  async signout() {
    return await this.firebaseService.auth.signOut();
  }

  async login(email: string, password: string) {
    return await this.firebaseService.auth.signInWithEmailAndPassword(email, password);
  }
}
