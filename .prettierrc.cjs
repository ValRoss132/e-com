module.exports = {
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: 'auto',
  printWidth: 120,
  singleQuote: true,
  tabSize: 4,
  overrides: [
    {
      files: ['**.*.scss', '*.scss'],
      options: {
        singleQuote: false,
      },
    },
  ],
};
