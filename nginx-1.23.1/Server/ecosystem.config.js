module.exports = {
  apps: [{
    name: "Server00",
    script: "src/server.js",
    watch: true,
    env: {
      "PORT": 8080,
    },
    exec_mode: "fork",
    node_args: "--harmony --expose-gc",
  },
  {
    name: "Server01",
    script: "src/server.js",
    watch: true,
    env: {
      "PORT": 8081,
    },
    exec_mode: "fork",
    node_args: "--harmony --expose-gc",
  },
  {
    name: "Server02",
    script: "src/server.js",
    watch: true,
    env: {
      "PORT": 8082,
    },
    exec_mode: "cluster",
    instances: 2,
  },
  {
    name: "Server03",
    script: "src/server.js",
    watch: true,
    env: {
      "PORT": 8083,
    },
    exec_mode: "fork",
    node_args: "--harmony --expose-gc",
  },
  {
    name: "Server04",
    script: "src/server.js",
    watch: true,
    env: {
      "PORT": 8084,
    },
    exec_mode: "fork",
    node_args: "--harmony --expose-gc",
  },
  {
    name: "Server05",
    script: "src/server.js",
    watch: true,
    env: {
      "PORT": 8085,
    },
    exec_mode: "fork",
    node_args: "--harmony --expose-gc",
  },
  {
    name: "Server06",
    script: "src/server.js",
    watch: true,
    env: {
      "PORT": 8086,
    },
    exec_mode: "fork",
    node_args: "--harmony --expose-gc",
  },
  ],
};
