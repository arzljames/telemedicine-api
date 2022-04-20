const router = require("express").Router();
const Facilities = require("../Models/Facilities");
const mongoose = require("mongoose");

router.post("/add", async (req, res) => {
  const facilities = {
    facility: req.body.name,
    specialization: req.body.specializations,
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

router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const facilities = {
    facility: req.body.name,
    specialization: req.body.specializations,
    address: {
      street: req.body.street,
      city: req.body.city,
      barangay: req.body.barangay,
    },
  };

  try {
    let result = await Facilities.findByIdAndUpdate(
      { _id: id },
      {
        facility: req.body.name,
        address: {
          street: req.body.street,
          city: req.body.city,
          barangay: req.body.barangay,
        },
      }
    );

    if (result) {
      res.send({ ok: "Facility successfully added.", result });
    }
  } catch (error) {
    res.send({ err: error });
  }
});

router.get("/get-spec", async (req, res) => {
  try {
    let result = await Facilities.findById({ _id: "623ec7fb80a6838424edaa29" });

    console.log(result);
    res.send(result.specialization);
  } catch (error) {
    console.log(error);
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
