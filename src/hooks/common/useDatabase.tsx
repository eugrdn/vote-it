import React, {useContext} from 'react';
import {firebase} from '~/core';
import {Firebase} from '~/core/Firebase';

const DatabaseContext = React.createContext<Firebase['database']>(firebase.database);

export const FirebaseProvider: React.FC<{}> = ({children}) => (
  <DatabaseContext.Provider value={firebase.database}>{children}</DatabaseContext.Provider>
);

export const useDatabase = () => useContext<Firebase['database']>(DatabaseContext);
