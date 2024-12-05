/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.po$/,
      use: {
        loader: "@lingui/loader",
      },
    });
    return config;
  },
  experimental: {
    swcPlugins: [
      [
        "@lingui/swc-plugin",
        {
          // Optional
          // Unlike the JS version this option must be passed as object only.
          // Docs https://lingui.dev/ref/conf#runtimeconfigmodule
          // "runtimeModules": {
          //   "i18n": ["@lingui/core", "i18n"],
          //   "trans": ["@lingui/react", "Trans"]
          // }
        },
      ],
    ],
  },
};

export default nextConfig;
