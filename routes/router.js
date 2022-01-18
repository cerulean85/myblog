const express = require("express")
let router = express.Router()
const action = require("../routes/action")

router.get('/', function (req, res, next) {
    res.render("index.html")
})

router.post('/textom/login', action.textom.login)

module.exports = router