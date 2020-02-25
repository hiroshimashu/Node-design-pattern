'use strict';

const level = require('level');
const sublevel = require('level-sublevel');

module.exports = dbName => sublevel(level(dbName, { valueEncoding: 'json' }));
