// @ts-check

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs');

const isProd = process.env.NODE_ENV === 'production';

/**
 * @type {Partial<import('next').NextConfig>}
 **/
const moduleExports = {
  env: {
  },
  basePath: isProd ? '' : '',
  assetPrefix: isProd ? '/' : '/', // assetPrefix requires the trailing slash
  reactStrictMode: true,
  poweredByHeader: false,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config

    // fix for @prisma/client until undici is at version 4
    if (isServer) {
      config.externals.push('_http_common');
      config.externals.push('encoding');
    }

    config.experiments = { layers: true };

    return config
  },
};

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
if (SENTRY_DSN)
  module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
else
  module.exports = moduleExports
