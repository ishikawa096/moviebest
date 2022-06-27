module.exports = async () => {
  return {
    verbose: true,
    preset: 'ts-jest',
    roots: ['<rootDir>/src'],
    moduleDirectories: ['node_modules', 'src'],
    moduleFileExtensions: ['tsx', 'ts', 'js'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
        useESM: true,
      },
    },
    testMatch: ['**/*.test.(ts|tsx)'],
    testEnvironment: 'jsdom',
  };
};
