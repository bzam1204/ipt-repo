const tsconfig = require('./tsconfig.json');
const { createDefaultPreset, pathsToModuleNameMapper } = require('ts-jest');

const tsJestTransformCfg = createDefaultPreset().transform;
const moduleNameMapper = pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
  prefix: '<rootDir>/',
});

/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper,
};
