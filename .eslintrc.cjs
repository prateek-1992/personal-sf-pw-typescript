module.exports = {
    extends: ['eslint:recommended', 
    'plugin:@typescript-eslint/recommended',
    'plugin:playwright/recommended'
  ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    parserOptions: {
      project: "./tsconfig.json",
      tsconfigRootDir: __dirname,
    },
    rules:{//playwright specific rules
        "playwright/no-useless-not":"error",
        "playwright/missing-playwright-await":"warn",
        "playwright/no-focused-test":"warn"
    }
  };