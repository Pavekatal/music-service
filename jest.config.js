module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@shared-types/(.*)$': '<rootDir>/src/shared-types/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
