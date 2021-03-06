const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const config = require("./config")
const router = require("./routes/router")
const logger = require("morgan")
const axios = require('axios');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use("/", router)
app.set("views", __dirname + "/views")
app.use("/scripts", express.static(__dirname + "/scripts"))
app.set("view engine", "ejs")
app.engine("html", require("ejs").renderFile)
app.use(express.static(__dirname + "/public"))

app.listen(config.access.port, () => {
    console.log(`Server Listening at http://${config.access.host}:${config.access.port}`)
})