const router = require("express").Router();
const Specialization = require("../Models/Specialization")




router.get("/", (req, res) => {
    res.send("speci working")
})