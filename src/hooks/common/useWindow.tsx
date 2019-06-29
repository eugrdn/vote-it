import {useEffect, useState} from 'react';

export function useWindow() {
  const [w, setWindow] = useState<Window | null>(null);

  useEffect(() => {
    setWindow(window);
  }, []);

  return w;
}
