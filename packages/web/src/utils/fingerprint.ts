import Fingerprint2 from 'fingerprintjs2';
import {FingerprintError} from '~/core/error';

export async function getOrCreateFingerprint(): Promise<string | undefined | FingerprintError> {
  const stored = sessionStorage.getItem('fingerprint');
  if (stored) {
    return stored;
  }

  const murmur = await fingerprint();
  if (murmur) {
    sessionStorage.setItem('fingerprint', murmur);
    return murmur;
  }
}

/**
 * Fingerprint strategy was copied form library example
 */
async function fingerprint() {
  try {
    const components = await Fingerprint2.getPromise();
    const murmur = Fingerprint2.x64hash128(components.map(pair => pair.value).join(), 31);
    return murmur;
  } catch (error) {
    const fe = new FingerprintError('Fingerprint Error', error.message);
    console.error(fe.detail);
    throw fe;
  }
}
