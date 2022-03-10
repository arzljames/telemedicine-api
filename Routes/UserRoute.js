const router = require("express").Router();
const User = require("../Models/User");
const checkAuth = require("../Middlewares/CheckAuth");

router.get("/users", checkAuth, async (req, res) => {
  let users = await User.find({});

  if (!users) {
    res.send({ err: "No users" });
  }

  res.send(users);
});

router.put("/verify/:id", async (req, res) => {
  const id = req.params.id;

  try {
    let user = await User.findById({ _id: id });

    if (user.verified) {
      res.send({ already: "Already verified" });
    } else {
      User.findByIdAndUpdate({ _id: id }, { verified: true }, (err, result) => {
        if (err) {
          res.send({ err: "Error" });
        } else {
          res.send({ ok: "Verified!" });
        }
      });
    }
  } catch (error) {
    res.send({ err: "Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    let result = await User.findOneAndDelete({ _id: id });

    if (result) {
      res.send({ ok: "Deleted" });
    }
  } catch (error) {
    res.send({ err: "Error deleting." });
  }
});

router.put("/add-patient/:id", async (req, res) => {
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
  };

  try {
    let result = await User.findByIdAndUpdate(
      { _id: id },
      { $push: { patient } }
    );

    if (result) {
      res.send({ ok: "Updated" });
    } else {
      res.send({ err: "Error" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get(`/patients/:id`, async (req, res) => {
  const id = req.params.id;

  try {
    let result = await User.findById({ _id: id });

    if (result) {
      res.send(result.patient);
    }
  } catch (error) {
    res.send({ err: "No data" });
  }
});

router.delete(`/remove-patients/:id/:patientId`, async (req, res) => {
  const id = req.params.id;
  const patientId = req.params.patientId;

  try {
    let result = await User.findByIdAndUpdate(
      { _id: id },
      {
        $pull: {
          patient: {
            _id: patientId,
          },
        },
      },
      {
        multi: true,
      }
    );

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
