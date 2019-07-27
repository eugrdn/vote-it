export type Action<T, P> = {
  type: T;
  payload: P;
};

export type Maybe<T> = T | undefined;

export type UpdateRemote<T> = (value: Partial<T>) => Promise<void>;
