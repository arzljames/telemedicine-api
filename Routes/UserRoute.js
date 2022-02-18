const router = require("express").Router();
const User = require("../Models/User");
const checkAuth = require("../Middlewares/CheckAuth");


router.get("/users", checkAuth, async(req, res) => {
    let users = await User.find({});

    if(!users) {
        res.send({err: "No users"});
    }

    res.send(users);
})

module.exports = router;