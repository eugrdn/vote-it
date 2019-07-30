import React, {useContext} from 'react';
import {firebase, FirebaseService} from '~/core';

const DatabaseContext = React.createContext<FirebaseService>(firebase);

export const FirebaseProvider: React.FC<{}> = ({children}) => (
  <DatabaseContext.Provider value={firebase}>{children}</DatabaseContext.Provider>
);

export const useDatabase = () => useContext<FirebaseService>(DatabaseContext);
