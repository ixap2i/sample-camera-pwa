const {generateSW} = require('workbox-build');
const swDest = 'build/sw.js';
const runtimeCaching = require('next-pwa/cache');

generateSW({
  swDest,
  clientsClaim: true,
  skipWaiting: true,
  // Other configuration options...
}).then(({count, size}) => {
  console.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
})

withPWA({
  pwa: {
    runtimeCaching,
  }
})
