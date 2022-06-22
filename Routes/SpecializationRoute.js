const router = require("express").Router();
const Specialization = require("../Models/Specialization")




router.post("/add", async(req, res) => {
    const specialization = req.body.specialization;
    const description = req.body.description;


    try {
        let result = await Specialization.create({
            specialization,
            description
        })

        if(result) {
            res.send({ok: "Added Specialization"})
        }
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;
