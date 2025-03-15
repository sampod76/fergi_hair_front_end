module.exports = {
  apps: [
    {
      name: 'dashboard', // Name of the application
      script: 'npm', // Using npm as the script runner
      args: 'run start', // The start script of your React app
      cwd: './', // Path to your React app directory
      env: {
        NODE_ENV: 'production', // Environment variable for production
      },
      watch: false, // You can enable this if you want to automatically restart the app on file changes
      instances: '1', // Number of instances to run (can use 'max' for all CPU cores)
      exec_mode: 'cluster', // For running in cluster mode (optional)
      max_memory_restart: '4G', // Optional: to restart the app if it exceeds 1GB memory usage
      log_date_format: 'YYYY-MM-DD HH:mm Z', // Date format for logs
    },
  ],
};
