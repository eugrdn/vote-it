module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?|ts?)$',
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsConfig: 'jest.tsconfig.json',
    },
  },
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/mocks.js',
  },
};
