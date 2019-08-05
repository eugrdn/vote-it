module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?|ts?)$',
  modulePathIgnorePatterns: ['<rootDir>/cypress'],
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsConfig: 'jest.tsconfig.json',
    },
  },
  moduleNameMapper: {
    '^~(.*)$': '<rootDir>/src$1',
  },
};
