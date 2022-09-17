module.exports = {
  apps: [{
    name: "Server1",
    script: "src/server.js",
    watch: true,
    env: {
      "PORT": 8081,
      "NODE_ENV": "development",
    },
    exec_mode: "fork",
  },
  {
    name: "Server2",
    script: "src/server.js",
    watch: true,
    env: {
      "PORT": 8082,
      "NODE_ENV": "development",
    },
    exec_mode: "fork",
  },
  {
    name: "Server3",
    script: "src/server.js",
    watch: true,
    env: {
      "PORT": 8080,
      "NODE_ENV": "development",
    },
    exec_mode: "cluster",
    instances: 0,
    args: "-a 2 b 30",
    node_args: "--expose-gc",
  }],
};
