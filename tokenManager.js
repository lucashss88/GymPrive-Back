const fs = require('fs');
const path = require('path');

const TOKEN_PATH = path.join(__dirname, 'token.json');

const saveToken = (token) => {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify({ token }), 'utf8');
};

const loadToken = () => {
  if (fs.existsSync(TOKEN_PATH)) {
    const tokenData = fs.readFileSync(TOKEN_PATH, 'utf8');
    return JSON.parse(tokenData).token;
  }
  throw new Error('Token not found. Please login first.');
};

module.exports = { saveToken, loadToken };