import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.mjs$': 'ts-jest',
    '/node_modules/marked/.+\\.js$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!(he|marked)/)'],
};

export default config;
