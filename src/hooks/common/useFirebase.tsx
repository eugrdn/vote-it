import React, {useContext} from 'react';
import {Firebase} from '~/core';

const FirebaseContext = React.createContext<Firebase>(null as any);

export const FirebaseProvider: React.FC<{}> = ({children}) => (
  <FirebaseContext.Provider value={new Firebase()}>{children}</FirebaseContext.Provider>
);

export const useFirebase = () => useContext<Firebase>(FirebaseContext);
