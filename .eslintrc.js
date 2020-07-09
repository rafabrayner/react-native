module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    "react-hooks/rules-of-hooks": 'error',
    "react-hooks/exhaustive-deps": 'warn' // <--- THIS IS THE NEW RULE
  }
};
