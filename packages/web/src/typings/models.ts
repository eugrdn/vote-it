import {User as FirebaseUser, UserInfo as FirebaseUserInfo} from 'firebase/app';

export type Id = string;

export type FirebaseUID = string;

export type RealtimeDatabase = {
  polls: Polls;
  users: CustomUsers;
};

export type FirebaseUsers = Record<Id, FirebaseUser>; // stored in firebase internally

export type FirebaseUser = FirebaseUser;

export type FirebaseUserInfo = FirebaseUserInfo;

export type Fingerprint = string;

export type CustomUsers = Record<FirebaseUID | Fingerprint, User>;

export type CustomUser = {
  id: FirebaseUID;
  parentRef: FirebaseUID;
  fingerprint: Fingerprint | null; // needed for anon users
  isAnonymous: boolean;
  polls: {
    created: Id[];
    part: Id[]; // TODO: check
  };
  votes: {
    [pollId: string]: Id;
  };
};

export type User = FirebaseUserInfo & CustomUser & Partial<FirebaseUser>;

export type Polls = Record<Id, Poll>;

export type Poll = {
  id: Id;
  topic: string;
  options: Options;
  author: User['id'];
  description: string;
  private: boolean;
  views: number;
};

export type Options = Record<Id, Option>;

export type Option = {
  id: Id;
  title: string;
  votes: number;
};
