module.exports = {
  '*.json': ['npm run format:check'],
  '*.{ts,tsx,js,jsx}': [
    'npm run lint',
    "bash -c 'npm run types:check'",
    'npm run format:check',
  ],
};
