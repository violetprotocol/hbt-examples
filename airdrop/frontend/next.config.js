/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["ipfs.io"],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.([cm]?ts|tsx)$/,
      use: [
        // options.defaultLoaders.babel, I don't think it's necessary to have this loader too
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
            onlyCompileBundledFiles: true,
          },
        },
      ],
    });

    return config;
  },
};