import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.mjs$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!he/)'],
};

export default config;
