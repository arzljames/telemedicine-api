const router = require("express").Router();
const Facilities = require("../Models/Facilities");
const checkAuth = require("../Middlewares/CheckAuth");
const mongoose = require('mongoose');

router.post("/add", checkAuth, async (req, res) => {
  const facilities = {
    facility: req.body.name,
    specialization:req.body.specializations,
    address: {
      street: req.body.street,
      city: req.body.city,
      barangay: req.body.barangay,
    },
  };

  try {
    let result = await Facilities.create(facilities);

    if (result) {
      res.send({ ok: "Facility successfully added.", result });
    }
  } catch (error) {
    res.send({ err: error });
  }
});

router.get("/", (req, res) => {
  Facilities.find({})
    .populate("user")
    .exec((err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

module.exports = router;
