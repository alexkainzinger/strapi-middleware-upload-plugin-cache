'use strict';

// Node.js core
const { resolve } = require('path');

// Public node modules
const _ = require('lodash');
const LRU = require('lru-cache');
const range = require('koa-range');
const staticCache = require('koa-static-cache');

const PLUGIN_NAME = 'upload-plugin-cache';

/**
 * Creates the middleware for strapi
 * 
 * @param {Strapi} strapi
 */

const UploadPluginCache = (strapi) => {
    const options = _.get(strapi, `config.middleware.settings.${PLUGIN_NAME}`, {});
    const dynamic = _.get(options, 'dynamic', false);
    const lruOptions = _.get(options, 'lruCache', { max: 1000 });

    // path & configs coming from 'strapi-provider-upload-local'
    const configPublicPath = strapi.config.get(
        'middleware.settings.public.path',
        strapi.config.paths.static
    );
    const staticDir = resolve(strapi.dir, configPublicPath);
    const endpoint = '/uploads/(.*)';


    /**
     * 
     * @param {string} msg 
     */
    const debug = (msg) => strapi.log.debug(`[UploadCache] ${msg}`);


    return {
        initialize() {
            debug('Initializing middleware ...');

            if (options.enabled) {
                let files = {};

                if (dynamic) {
                    debug('Initializing LRU-cache for middleware ...');
                    files = new LRU(lruOptions);
                }

                debug(`Middleware initialized for endpoint='${endpoint}' [maxAge=${options.maxAge}]`);
                strapi.router.get(endpoint, range, staticCache(staticDir, { ...options, files }));
            }
        }
    };
};

module.exports = UploadPluginCache;