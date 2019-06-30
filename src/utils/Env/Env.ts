import getConfig from 'next/config';

const {publicRuntimeConfig, serverRuntimeConfig} = getConfig();

export class Env {
  static getPublicRuntimeVariable(key: string) {
    return publicRuntimeConfig[key];
  }

  static getServerVariable(key: string) {
    return serverRuntimeConfig[key];
  }
}
