import hyperid from 'hyperid';

const instance = hyperid({urlSafe: true});

export const uniqueId = () => instance()
