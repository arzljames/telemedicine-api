const router = require('express').router
const Specialization = require("../Models/Specialization")




router.get("/", (req, res) => {
    res.send("speci working")
})