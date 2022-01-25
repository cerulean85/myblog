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
};

const log = {
    queryCallRequest: function (sql, addr) {
        console.log('===> [Begin]   SQL//Addr: ' + addr);
        console.log(sql);
        console.log('-------------------------------------------\n\n');
    },
    queryCallResponse: function (result, sql, addr) {
        console.log('===> [End]    SQL//Addr: ' + addr);
        console.log(sql);
        console.log('*********  Response Data');
        console.log(result);
        console.log('-------------------------------------------\n\n');
    },
    actionCallRequest: function (data, addr) {
        console.log('===> [Begin]   POST//Addr: ' + addr);
        console.log(data);
        console.log('-------------------------------------------\n\n');
    },
    actionCallResponse: function (result, data, addr) {
        console.log('===> [End]    POST//Addr: ' + addr);
        console.log(data);
        console.log('*********  Response Data');
        console.log('-------------------------------------------\n\n');
    }
};

function query(sql, addr, action) {
    log.queryCallRequest(sql, addr);
    config.pool.getConnection(function(err, conn) {
        if (err) {
            console.log('######### Error in connection database');
            action({
                type: 'conn',
                message: 'Connection Error From DB',
            }, null);
            conn.release();
            return;
        }

        conn.query(sql, function (err, result) {
            conn.release();
            if (err) {
                console.log('######### Syntax Error');
                console.log(sql);
                action({
                    type: 'syntax',
                    message: 'Syntax Error From DB',
                }, null);
                return;
            }
            log.queryCallResponse(result, sql, addr);
            action({type: 'success' }, result);
        });
    });
}


module.exports = {

    query_filter: function(searchType, searchKeyword) {
        let filter = ''
        if (searchType === "title")
            filter = ` AND ART.title LIKE CONCAT('%${searchKeyword}%') `
        else if (searchType === "contents")
            filter = ` AND ART.contents LIKE CONCAT('%${searchKeyword}%') `
        else if (searchType === "nickname")
            filter = ` AND U.nickname LIKE CONCAT('%${searchKeyword}%') `
        return filter
    },

    query_select: function (obj) {
        query(obj.sql, obj.addr, function (err, result) {

            if(err.type==='conn' || err.type==='syntax') {
                obj.call_res.send({ err_message: err.message });
                return;
            }

            let list = [];
            result.forEach(function (item, index, array) {
                list.push(item);
            });

            if(obj.reverse)
                list.reverse();

            if(obj.res_send)
                obj.call_res.send({
                    err: undefined,
                    totalCount: list.length,
                    list: list
                });

            if (list.length > 0 && obj.emit !== undefined)
                obj.emit(result);
        });
    },
    query_insert: function (obj) {
        query(obj.sql, obj.name, function (err, result) {

            if (err.type === 'conn' || err.type === 'syntax') {
                obj.call_res.send({err_message: err.message});
                return;
            }

            if(obj.res_send)
                obj.call_res.send({
                    err: undefined,
                    insert_id: result.insertId
                });

            if (result.insertId > 0 && obj.emit !== undefined)
                obj.emit(result);
        });
    },
    query_update: function (obj) {
        query(obj.sql, obj.addr, function (err, result) {

            if(err.type==='conn' || err.type==='syntax') {
                obj.call_res.send({ err_message: err.message });
                return;
            }

            obj.call_res.send();
        });
    },
    query_delete: function (obj) {
        query(obj.sql, obj.addr, function (err, result) {

            if(err.type==='conn' || err.type==='syntax') {
                obj.call_res.send({ err_message: err.message });
                return;
            }

            obj.call_res.send();
        });
    }
}