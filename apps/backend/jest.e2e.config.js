const tsconfig = require('./tsconfig.json');
const { createDefaultPreset, pathsToModuleNameMapper } = require('ts-jest');

const tsJestTransformCfg = createDefaultPreset().transform;
const moduleNameMapper = pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
  prefix: '<rootDir>/',
});

/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.e2e-spec.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper,
};

