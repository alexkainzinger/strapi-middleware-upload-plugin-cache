'use strict';

module.exports = {
  default: {
    dynamic: false,
    maxAge: 86_400_000,
    lruOptions: {
      max: 1000
    }
  },
  validator() {},
};
