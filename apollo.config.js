module.exports = {
  client: {
    service: {
      name: 'almansi',
      url: 'https://graphqlzero.almansi.me/api',
      includes: ['./src/**/*.ts', './src/**/*.tsx'],
      excludes: ['./src/**/*.test.tsx', './src/**/*.test.ts', 'node_modules/*'],
      tagName: 'gql',
    },
  },
};
