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


router.put("/verify/:id", async(req, res) => {
    const id = req.params.id;

   try {
    let user = await User.findById({_id: id});

    if(user.verified){
        res.send({already: "Already verified"})
    } else {
        User.findByIdAndUpdate({_id: id}, {verified: true}, (err, result) => {
            if (err) {
                res.send({err: "Error"})
            } else {
                res.send({ok: "Verified!"})
            }
        })
    }
   } catch (error) {
    res.send({err: "Error"})
   }
})


router.delete("/delete/:id", async(req, res) => {
    const id = req.params.id;

    try {
        let result = await User.findOneAndDelete({_id: id});

        if(result) {
            res.send({ok: "Deleted"})
        }
    } catch (error) {
        res.send({err: "Error deleting."})
    }
})

module.exports = router;