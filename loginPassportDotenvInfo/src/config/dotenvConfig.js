// config.js 
const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;

const DEV_PORT = 8080;

const DBS = {
  mongo: "MONGODB",
  memory: "MEMORY",
  filesystem: "FILE",
  sql: "SQL",
  mariadb: "MARIADB"
}

const config = {
  envs,
  persistences:DBS,
  server: {
    PORT: envs.PORT ?? DEV_PORT,
    routes: {
      base: "/api",
      sessions: "/api/sessions",
      views: "/api/views"
    }
  }
}

console.log("En dotenv config >>>> ",config)
module.exports = config;