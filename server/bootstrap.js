'use strict';

const uploadCacheMiddleware = require('./middlewares/middleware');

module.exports = async ({ strapi }) => {
  uploadCacheMiddleware({ strapi });
};
