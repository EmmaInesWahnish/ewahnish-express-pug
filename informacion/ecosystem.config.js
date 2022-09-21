module.exports = {
  apps: [{
    name: "Server1",
    script: "src/server.js",
    watch: true,
    env: {
      "PORT": 8081,
    },
    exec_mode: "fork",
    args: "-a 2 b 30",
    node_args: "--harmony --expose-gc",
  },
  {
    name: "Server2",
    script: "src/server.js",
    watch: true,
    env: {
      "PORT": 8082,
    },
    exec_mode: "fork",
  },
  {
    name: "Server3",
    script: "src/server.js",
    watch: true,
    env:{
      "PORT": 8080, 
    },
    exec_mode: "cluster",
    instances:0,
    node_args: "--harmony --expose-gc",
  }],
};
