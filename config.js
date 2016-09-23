module.exports = {
  port: 8989,
  host: "0.0.0.0",
  db: {
    port    : "27017",
    host    : "0.0.0.0",
    dbName  : "dev",
    /** remove this if you don't need auth **/
    auth: {
      username: "admin",
      password: "admin",
      authdb  : "admin"
    }
  }
}