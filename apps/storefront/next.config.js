//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,

  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nhp-asia-vn.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    'API_BASE_URL': 'http://localhost:3000/api',
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
