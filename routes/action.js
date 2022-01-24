const config = require("../config")
const query = require("../modules/query")
const util = require("../modules/util")

module.exports = {

    hello: function(req, res) {

        const port = config.access.port

        res.send(`Welcome!!23 ${port}`)
    },

    textom: {
        login: function(req, res) {
            const userId = req.body.user_id
            const userPass = req.body.user_pass

            res.send(`Hello Textom!! ${userId}, ${userPass}`)
        }
    },

    get_articles: function(req, res) {
        query.query_select({
            "name": "insert_article",
            "sql": `SELECT * FROM article WHERE deleted = 0`,
            "emit": function (result) {
                let articles = []
                for (const article of result) {

                    const createdAtDTForm = util.stringToDatetime(article.created_at)
                    const updatedAtDTForm = util.stringToDatetime(article.updated_at)
                    articles.push({
                        "no": article.no,
                        "user_no": article.user_no,
                        "content_type": article.content_type,
                        "title": article.title,
                        "contents": article.contents,
                        "create_at": article.created_at,
                        "update_at": article.updated_at,
                        "files": article.files,
                        "view_count": article.view_count
                    })
                }
                res.send({
                    err: undefined,
                    totalCount: articles.length,
                    list: articles
                })
                console.log(articles)
            },
            "call_res": res,
            "reverse": false,
            "res_send": true,
        });
    },

    insert_article: function(req, res) {
        const userNo      = req.body.user_no
        const title       = req.body.title
        const contents    = req.body.contents
        const files       = req.body.files
        const contentType = req.body.content_type
        query.query_insert({
            "name": "insert_article",
            "sql": `INSERT INTO article(user_no, content_type, title, contents, files, created_at, updated_at) 
                                 VALUES(${userNo}, ${contentType}, '${title}', '${contents}', '${files}', NOW(), NOW())`,
            "emit": function (result) {
                console.log(`RESULT: ${result}`)
            },
            "call_res": res,
            "reverse": false,
            "res_send": true,
        });
    },

    update_article: function(req, res) {
        const articleNo   = req.body.article_no
        const userNo      = req.body.user_no
        const title       = req.body.title
        const contents    = req.body.contents
        const files       = req.body.files
        const contentType = req.body.content_type
        query.query_update({
            "name": "update_article",
            "sql": `UPDATE article SET
                        content_type = ${contentType},
                        title = '${title}',
                        contents = '${contents}',
                        files = '${files}',
                        updated_at = NOW()
                    WHERE no = ${articleNo}`,
            "emit": function (result) {
                console.log(`RESULT: ${result}`)
            },
            "call_res": res,
            "reverse": false,
            "res_send": true,
        });
    },
    delete_article: function(req, res) {
        const articleNo   = req.body.article_no
        query.query_update({
            "name": "update_article",
            "sql": `DELETE FROM article WHERE no = ${articleNo}`,
            "emit": function (result) {
                console.log(`RESULT: ${result}`)
            },
            "call_res": res,
            "reverse": false,
            "res_send": true,
        });
    },

    insert_file: function(req, res) {
        const name      = req.body.name
        const url       = req.body.url
        const order     = req.body.order
        query.query_insert({
            "name": "insert_file",
            "sql": `INSERT INTO article(name, url, order, updated_at) VALUES(${name}, ${url}, ${order}, NOW())`,
            "emit": function (result) {console.log(`RESULT: ${result}`)},
            "call_res": res,
            "reverse": false,
            "res_send": true,
        });
    },

    update_file: function(req, res) {
        const fileNo    = req.body.no
        const name      = req.body.name
        const url       = req.body.url
        const order     = req.body.order
        query.query_update({
            "name": "update_file",
            "sql": `UPDATE article SET
                        name  = ${name},
                        url   = ${url},
                        order = ${order},
                        updated_at = NOW()
                    WHERE no = ${fileNo}`,
            "emit": function (result) {
                console.log(`RESULT: ${result}`)
            },
            "call_res": res,
            "reverse": false,
            "res_send": true,
        });
    },
    delete_file: function(req, res) {
        const fileNo    = req.body.no
        query.query_update({
            "name": "delete_file",
            "sql": `DELETE FROM file WHERE no = ${fileNo}`,
            "emit": function (result) {
                console.log(`RESULT: ${result}`)
            },
            "call_res": res,
            "reverse": false,
            "res_send": true,
        });
    }
}