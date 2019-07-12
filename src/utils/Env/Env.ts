export class Env {
  static getPublicRuntimeVariable(key: string) {
    return process.env[key];
  }

  static getServerVariable(key: string) {
    return process.env[key];
  }
}
