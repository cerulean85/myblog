const config = require("../config")

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
    }
}