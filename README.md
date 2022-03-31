# strapi-middleware-upload-plugin-cache

## Use case
- ``@strapi/provider-upload-local`` is in use for uploading assets via ``Media Library`` in Strapi (default)
- The need for configurable cache-control HTTP response headers (e.g. ``cache-control: max-age=1234``) + [ETag HTTP response header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) for each asset
- More information and differences between ``koa-static`` (used in ``@strapi/provider-upload-local``) and ``koa-static-cache`` (used in this middleware-plugin) can be found [here](https://github.com/koajs/static-cache)

## Installing

### For Strapi 3
Version 2.X.X+ of this library is **NOT** compatible with Strapi v3!

Please make sure to check out the [Strapi v3 Docs](docs/v3/README.md) for the installation & setup.

### For Strapi 4
Using npm

```
npm install strapi-middleware-upload-plugin-cache
```

Using yarn

```
yarn add strapi-middleware-upload-plugin-cache
```

## Setup
For Strapi, add a ``middlware.js`` file within the config folder (if you do not already have an exisiting config/middleware.js)

e.g.
```
touch config/middleware.js
```

containing

```
module.exports = {
  settings: {
    "upload-plugin-cache": {
      enabled: true,
      maxAge: 86_400_000,
      config: {
        maxAge: 86_400_000,
      },
    }
  }
};
```

Starting Strapi in dev-mode should log the following:
```
[2022-02-22 22:22:22.222] debug: [upload-plugin-cache] Initializing ...
[2022-02-22 22:22:22.222] debug: [upload-plugin-cache] Middleware initialized for endpoint='/uploads/(.*)' [maxAge=300000]
```


## Configuration Options
With the option ``dynamic: true`` files which are not cached on initializations are dynamically loaded. To avoid OOM errors a [LRU-cache can be used](https://www.npmjs.com/package/@zhennann/koa-static-cache#using-a-lru-cache-to-avoid-oom-when-dynamic-mode-enabled). For config options of lru-cache use these [docs](https://www.npmjs.com/package/lru-cache) and insert them at ``lruCache``.

```
module.exports = {
  settings: {
    "upload-plugin-cache": {
      enabled: true,
      config: {
        maxAge: 86_400_000,
        dynamic: true,
        lruCache: {
          max: 1000
        },
      },
    }
  }
};
```

## Resources

- [License](LICENSE)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
