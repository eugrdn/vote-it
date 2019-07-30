import React, {useContext, useEffect, useState} from 'react';
import {auth, Auth} from '~/core';
import {User} from '~/typings/models';
import {Maybe} from '~/typings/common';

type MaybeUser = Maybe<User>;

type AuthTuple = [MaybeUser, Auth];

const AuthContext = React.createContext<AuthTuple>([undefined, auth]);

export const AuthProvider: React.FC<{}> = ({children}) => {
  const [user, setUser] = useState<MaybeUser>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async firebaseUser => {
      if (user && !firebaseUser) {
        setUser(undefined);
      } else if (!user && firebaseUser) {
        const signedUser = await auth.getSignedUser(firebaseUser.uid, firebaseUser.isAnonymous);
        setUser(signedUser);
      } else if (!user && !firebaseUser && !auth.signing) {
        await auth.signupAnonymously();
      }
    });
    return () => unsubscribe();
  }, [user && user.id]);

  return <AuthContext.Provider value={[user, auth]}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext<AuthTuple>(AuthContext);
