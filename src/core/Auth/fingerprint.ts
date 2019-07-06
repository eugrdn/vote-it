import Fingerprint2 from 'fingerprintjs2';

/**
 * Fingerprint strategy was copied form library example
 */
export const fingerprint = async () => {
  try {
    const components = await Fingerprint2.getPromise();
    const murmur = Fingerprint2.x64hash128(components.map(pair => pair.value).join(), 31);
    return murmur;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};
