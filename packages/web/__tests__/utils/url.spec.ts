import {url} from '~/utils';

describe('Utils: url', () => {
  it('should return url string representation related to current window data', () => {
    const locationMock = {
      protocol: 'http:',
      hostname: 'localhost',
      port: '3000',
    };

    expect(url(locationMock)).toBe('http://localhost:3000');
  });

  it('should handle port lack correctly', () => {
    const locationMock = {
      protocol: 'http:',
      hostname: 'localhost',
    };

    expect(url(locationMock)).toBe('http://localhost');
  });
});
