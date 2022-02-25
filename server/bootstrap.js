'use strict';

const uploadCacheMiddleware = require('./middlewares');

module.exports = async ({ strapi }) => {
  uploadCacheMiddleware({ strapi });
};
