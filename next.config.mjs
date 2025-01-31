/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Outputs a Single-Page Application (SPA).
    distDir: './dist', // Changes the build output directory to `./dist/`.
    images: {
      unoptimized: true, // Add this line
    },
    // webpack: (config, { dev, isServer }) => {
    //   if (dev && !isServer) {
    //     config.watchOptions = {
    //       poll: 1000, // Check for changes every second
    //       aggregateTimeout: 300, // Delay before rebuilding
    //       ignored: '/node_modules/', // Ignore node_modules
    //     };
    //   }
    //   return config;
    // },
}
  export default nextConfigclear
  