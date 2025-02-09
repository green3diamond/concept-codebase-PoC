/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // webpack: (config, { dev, isServer }) => {
    //   // This is only needed for development builds
    //   if (dev && !isServer) {
    //     config.experiments = {
    //       ...config.experiments,
    //       topLevelAwait: true,
    //       layers: true  // Enable the layers experiment
    //     }
    //   }
    //   return config
    // },
}
  export default nextConfig

  