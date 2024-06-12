const express = require('express')
const bp = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
let url = require('./url')
let app = express()
app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())
app.use(cors())

mongoose.connect(url, { dbName: "miniprj" })
    .then(() => {
        console.log("connection success")
    }, (errRes) => {
        console.log("Connection failed:", errRes)
    })
//import routes
const productRoutes = require('./routes/product-routes')
//use routes
app.use("/", productRoutes)
let port = 8080
app.listen(port, () => {
    console.log("server listening port no:", port)
})