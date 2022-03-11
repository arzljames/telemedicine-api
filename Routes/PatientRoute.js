const router = require("express").Router();
const Patient = require("../Models/Patient");

router.post("/add/:id", async (req, res) => {
  const id = req.params.id;

  const patient = {
    firstname: req.body.firstname,
    middlename: req.body.middlename,
    lastname: req.body.lastname,
    contact: req.body.contact,
    sex: req.body.sex,
    birthday: req.body.birthday,
    civilStatus: req.body.civilStatus,
    religion: req.body.religion,
    birthplace: req.body.birthplace,
    address: {
      street: req.body.street,
      barangay: req.body.barangay,
      city: req.body.city,
    },
    ethnicity: req.body.ethnicity,
    guardian: {
      name: req.body.fullname,
      relationship: req.body.relationship,
    },
    physician: id,
  };

  try {
    let result = await Patient.create(patient);

    if (result) {
      res.send({ ok: "Updated" });
    } else {
      res.send({ err: "Error" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    let result = await Patient.find({}).populate("physician");

    if (result) {
      res.send(result);
    }
  } catch (error) {
    res.send({ err: "Error fetching data from the server" });
    console.log(error.message)
  }
});

router.delete(`/delete/:id`, async (req, res) => {
  const id = req.params.id;

  try {
    let result = await Patient.findByIdAndDelete({ _id: id });

    if (result) {
      res.send({ ok: "Removed one (1) patient." });
    } else {
      res.send({ err: "There's a problem removing this patient." });
    }
  } catch (error) {
    res.send({ err: "There's a problem removing this patient." });
  }
});

module.exports = router;
