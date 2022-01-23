const express = require("express")
let router = express.Router()
const action = require("../routes/action")

router.get('/', function (req, res, next) {
    res.render("index.html")
})

router.post('/textom/login', action.textom.login)
router.post('/insert_article', action.insert_article)
router.post('/update_article', action.update_article)
router.post('/delete_article', action.delete_article)

module.exports = router