import {useEffect, useState} from 'react';

export function useWindow() {
  const [w, setWindow] = useState<Maybe<Window>>(undefined);

  useEffect(() => {
    setWindow(window);
  }, []);

  return w;
}
