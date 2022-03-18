const router = require("express").Router();
const Patient = require("../Models/Patient");
const Case = require("../Models/Case");

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
    console.log(error.message);
  }
});

router.delete(`/delete/:id`, async (req, res) => {
  const id = req.params.id;

  try {
    let result = await Patient.findByIdAndDelete({ _id: id });

    if (result) {
      Case.deleteMany({ patient: id }).then((err, success) => {
        if (success) {
          console.log(success);
        }
      });
      res.send({ ok: "Removed one (1) patient." });
    } else {
      res.send({ err: "There's a problem removing this patient." });
    }
  } catch (error) {
    res.send({ err: "There's a problem removing this patient." });
  }
});

router.put("/add-case/:id", async (req, res) => {
  const patientId = req.params.id;

  try {
    let result = await Case.create({
      patient: patientId,
      physician: req.body.physician,
      referralPhysician: req.body.referralPhysician,
      hospital: req.body.hospital,
      temperature: req.body.temperature,
      respiratory: req.body.respiratory,
      heart: req.body.heart,
      blood: req.body.blood,
      oxygen: req.body.oxygen,
      weight: req.body.weight,
      height: req.body.height,
      cc: req.body.cc,
      hpi: req.body.hpi,
      pmh: req.body.pmh,
      ros: req.body.ros,
      pe: req.body.pe,
      paraclinical: req.body.paraclinical,
      wi: req.body.wi,
      imd: req.body.imd,
      reason: req.body.reason,
    });

    if (result) {
      res.send({ ok: "Medical case record saved." });
    }
  } catch (error) {
    res.send({
      err: "A problem occured. Please check any empty field/s and try again.",
    });
  }
});

router.get("/case", async (req, res) => {
  try {
    let result = await Case.find({})
      .populate("physician")
      .populate("referralPhysician")
      .populate("patient");
    if (result) {
      res.send(result);
    }
  } catch (error) {
    res.send({ err: "401 error request." });
  }
});

router.put("/response/:id", async (req, res) => {
  const id = req.params.id;

  const comments = {
    content: req.body.comment,
    user: req.body.id,
  };

  try {
    let result = await Patient.findOneAndUpdate(
      { _id: req.body.patientId },
      {
        $addToSet: {
          "case.$[el].comments": comments,
        },
      },
      {
        arrayFilters: [{ "el._id": id }],
        new: true,
      }
    );

    if (result) {
      res.send(result);
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/banner/:id", async (req, res) => {
  try {
    let result = await Case.findByIdAndUpdate(
      { _id: req.params.id },
      { banner: false }
    );

    if (result) {
      res.send({ ok: "Banner deactivated" });
    }
  } catch (error) {
    res.send({ err: "401 Error" });
  }
});

// router.get("/delete-case/:id", (req, res) => {
//   Case.find({ patient: req.params.id }).then((response) => {
//     res.send(response);
//   });
// });

module.exports = router;
