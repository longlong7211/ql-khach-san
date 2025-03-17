module.exports = {
  apps: [
    {
      name: "demo",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 80",
      instances: 1,
      watch: ["src"],
      ignore_watch: ["node_modules"],
      watch_options: {
        followSymlinks: false,
      },
    },
  ],
};