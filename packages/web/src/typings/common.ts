export type Action<T, P> = {
  type: T;
  payload: P;
};

export type UpdateRemote<T> = (value: Partial<T>) => Promise<Error | null>;
