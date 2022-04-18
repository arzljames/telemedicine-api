const router = require("express").Router();


router.get("/", (req, res) => {
    res.send("Report")
})


module.exports = router;
