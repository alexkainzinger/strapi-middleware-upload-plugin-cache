"use strict";

const range = require("koa-range");
const staticCache = require("koa-static-cache");
const LRU = require("lru-cache");

const PLUGIN_NAME = "upload-plugin-cache";
const UPLOAD_PATH = "/uploads/(.*)";

/**
 * Creates the middleware for strapi
 * @param {{ strapi: import('@strapi/strapi').Strapi }}
 */
module.exports = ({ strapi }) => {
  /**
   *
   * @param {string} msg message which should be printed
   */
  const debug = (msg) => strapi.log.debug(`[${PLUGIN_NAME}] ${msg}`);

  debug("Initializing ...");

  const options = strapi.config.get(`plugin.${PLUGIN_NAME}`, {});

  const dynamic = !!options.dynamic;
  const files = dynamic ? new LRU(options.lruOptions) : {};

  debug(
    `Middleware initialized for endpoint='${UPLOAD_PATH}' [maxAge=${options.maxAge}]`
  );

  const publicDir =
    typeof strapi.dirs.static === "object"
      ? strapi.dirs.static.public // Strapi 4.3+
      : strapi.dirs.public; // Strapi < 4.3

  strapi.server.routes([
    {
      method: "GET",
      path: UPLOAD_PATH,
      handler: [range, staticCache(publicDir, { ...options, files })],
      config: { auth: false },
    },
  ]);
};
