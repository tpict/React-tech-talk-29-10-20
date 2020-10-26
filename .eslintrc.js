module.exports =  {
  parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends:  [
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint',  // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:react/recommended',
    'plugin:prettier/recommended',  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:jsx-a11y/recommended',
  ],
  plugins: [
    "react-hooks",
    "import",
  ],
  parserOptions:  {
    ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
    sourceType:  'module',  // Allows for the use of imports
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    // "import/resolver": {
    //   typescript: {},
    // },
  },
  rules: {
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      2,
      {
        "varsIgnorePattern": "^_.",
        "argsIgnorePattern": "^_."
      }
    ],
    "@typescript-eslint/explicit-function-return-type": ["error", {
      "allowTypedFunctionExpressions": true,
      "allowExpressions": true,
    }],
    "react/prop-types": 0,
    "no-console": ["error", { allow: ["warn", "error"] }],
    "import/order": ["error", {
      pathGroups: [
        {
          "pattern": "react",
          "group": "external",
          "position": "before"
        }],
      "pathGroupsExcludedImportTypes": ["react"],
      "newlines-between": "always",
      alphabetize: {
        order: 'asc',
      },
    }],
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          // This is actually sound advice, but the react-table declaration
          // file leans on this type a lot, and I don't feel like fiddling with
          // it right now
          object: false
        }
      }
    ],
  }
};
