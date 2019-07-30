import React, {useContext, useEffect, useState} from 'react';
import {auth, AuthService} from '~/core';
import {useDatabase} from '~/hooks/common/useDatabase';
import {User} from '~/typings/models';

type MaybeUser = Maybe<User>;

type AuthTuple = [MaybeUser, AuthService];

const AuthContext = React.createContext<AuthTuple>([undefined, auth]);

export const AuthProvider: React.FC<{}> = ({children}) => {
  const [user, setUser] = useState<MaybeUser>();
  const db = useDatabase();

  useEffect(
    () =>
      auth.onAuthStateChanged(async firebaseUser => {
        if (!firebaseUser && !user) {
          await auth.signupAnonymously();
        } else if (firebaseUser && (!user || user.id !== firebaseUser.uid)) {
          setUser(await db.getUser());
        } else if (!firebaseUser && user) {
          setUser(undefined);
        }
      }),
    [user && user.id],
  );

  return <AuthContext.Provider value={[user, auth]}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext<AuthTuple>(AuthContext);
