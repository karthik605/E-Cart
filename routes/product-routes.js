//import express module
const express = require('express')
//create router instance
const router = express.Router()
//import productApi
const productApi = require('../apis/products-apis')
//fetch all records
router.get("/fetch", productApi.products_all)
// login
router.post("/login", productApi.login)
// create user
router.post("/create", productApi.createUser)
// insert cart
router.post("/insertCart", productApi.insertCart)
// fetch cart
router.get("/fetchCart", productApi.fetchCart)
// update cart
router.put("/updateCart", productApi.updateCart)
// delete cart
router.delete("/deleteCart", productApi.deleteCart)
module.exports = router