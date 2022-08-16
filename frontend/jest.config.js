const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: ['node_modules', 'src'],
  setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
}

module.exports = createJestConfig(customJestConfig)
