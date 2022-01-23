const dbconn = require("mysql");
const config = {
    pool : dbconn.createPool({
        connectionLimit : 100,
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '12345678',
        database: 'kkennib',
        acquireTimeout: 1000000
    }),
    port : 3001,
    grpc_aggregator_port : 8084,
    grpc_collector_port : 8085,
    host: 'localhost',
};
module.exports = config;
