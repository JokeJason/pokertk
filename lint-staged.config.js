module.exports = {
  '*.{ts,tsx,js,jsx,json}': [
    'npm run lint',
    "bash -c 'npm run types:check'",
    'npm run format:check',
  ],
};
