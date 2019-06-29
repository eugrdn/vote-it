export type AppState = {
  polls: Readonly<Polls>;
  users: Readonly<Users>;
};

export type Poll = {
  id: Id;
  topic: string;
  options: Options;
  author: User['id'];
  description: string;
  private: boolean;
  views: number;
};

export type User = Anonymous | Registered;

export type Polls = Record<Id, Poll>;

export type Users = Record<Id, User>;

export type Options = Record<Id, Option>;

export type Option = {
  id: Id;
  title: string;
  votes: number;
};

type Id = string;

type TempId = string;

export type Registered = {
  id: Id;
  name: string;
  email: string;
  polls: {
    created: Id[];
    part: Id[];
  };
};

export type Anonymous = {
  id: TempId;
  name: string;
  polls: {
    created: Id[];
    part: Id[];
  };
};
