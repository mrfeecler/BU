module.exports = {
  apps: [
    {
      name: "api-receive-5000",
      script: "./index.js",
      watch: true,
      restart_delay: 10000,
      exec_mode: "cluster",
      instances: 2,
    },
  ],
};
