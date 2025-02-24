module.exports = {
  apps: [
    {
      name: 'd_fergie',
      script: 'node_modules/.bin/serve', // Correct path to 'serve'
      args: '-s dist -l 3006', // Serve 'dist' folder on port 3005
      instances: '1', // Single instance
      exec_mode: 'cluster', // Cluster mode for scaling
      watch: false, // Disable watch in production
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
