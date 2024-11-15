module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
      '\\.(css|less|scss)$': 'identity-obj-proxy',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!your-esm-package-name|another-esm-package-name)',
    ],
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}", 
      "!src/serviceWorker.js", 
      "!src/setupTests.js"
    ],
    coverageReporters: ["html", "text-summary"],
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
      }
    }
  };
  