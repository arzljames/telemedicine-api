const router = require("express").Router();
const Specialization = require("../Models/Specialization");

router.post("/add", async (req, res) => {
  const specialization = req.body.specialization;
  const description = req.body.description;

  try {
    let result = await Specialization.create({
      specialization,
      description,
    });

    if (result) {
      res.send({ ok: "Added Specialization" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    let result = await Specialization.find({});

    if (result) {
      res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const specialization = req.body.specialization;
  const description = req.body.description;

  try {
    let result = await Specialization.findByIdAndUpdate(
      { _id: id },
      {
        specialization,
        description,
      }
    );

    if (result) {
      res.send({ ok: "Updated Specialization" });
    }
  } catch (error) {
    res.send({ err: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    let result = await Specialization.find({});

    if (result) {
      res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
