import getConfig from 'next/config';

const {publicRuntimeConfig, serverRuntimeConfig} = getConfig();

export class Env {
  static getPublicVar(key: string) {
    return publicRuntimeConfig[key];
  }

  static getServerVar(key: string) {
    return serverRuntimeConfig[key];
  }
}
