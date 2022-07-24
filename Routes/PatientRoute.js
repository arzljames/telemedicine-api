const router = require("express").Router();
const Patient = require("../Models/Patient");
const Case = require("../Models/Case");
const Notification = require("../Models/Notification");

router.post("/add/:id", async (req, res) => {
  const id = req.params.id;
  const fullname =
    req.body.lastname +
    "," +
    " " +
    req.body.firstname +
    " " +
    req.body.middlename[0] +
    ".";

  const patient = {
    firstname: req.body.firstname,
    middlename: req.body.middlename,
    lastname: req.body.lastname,
    fullname: fullname,
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
    dialect: req.body.dialect,
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

router.put("/update/:id/:patientId", async (req, res) => {
  const id = req.params.id;
  const patientId = req.params.patientId;
  const fullname =
    req.body.lastname +
    "," +
    " " +
    req.body.firstname +
    " " +
    req.body.middlename[0] +
    ".";

  try {
    let result = await Patient.findByIdAndUpdate(
      { _id: patientId },
      {
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        fullname: fullname,
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
      }
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

router.delete(`/delete/:id/`, async (req, res) => {
  const id = req.params.id;

  try {
    let result = await Patient.findByIdAndDelete({ _id: id });

    if (result) {
      Notification.deleteMany({ patient: id }).then((err, success) => {
        if (success) {
          console.log(success);
        }
      });

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

router.put("/multiple-delete", async (req, res) => {
  const patientsId = req.body.patientsId;

  try {
    let result = await Patient.deleteMany({ _id: { $in: patientsId } });

    if (result) {
      Notification.deleteMany({ patient: { $in: patientsId } }).then(
        (err, success) => {
          if (success) {
            console.log(success);
          }
        }
      );

      Case.deleteMany({ patient: { $in: patientsId } }).then((err, success) => {
        if (success) {
          console.log(success);
        }
      });

      res.send({ ok: patientsId });
      //res.send({ ok: "Removed one (1) patient." });
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
      designation: "623ec7fb80a6838424edaa29",
      patient: patientId,
      caseId: req.body.caseId,
      active: "Pending",
      physician: req.body.physician,
      specialization: req.body.specialization,
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
      paraclinical: {
        name: req.body.paraclinicalName,
        file: req.body.paraclinicalFile,
      },
      wi: req.body.wi,
      imd: req.body.imd,
      reason: req.body.reason,
      createdAt: req.body.todate,
    });

    if (result) {
      Notification.create({
        patient: patientId,
        specialization: req.body.specialization,
        from: req.body.physician,
        title: "added a new case.",
        body: `View for more details`,
        link: `/consultation/case/case-data/${result._id}`,
        case: result._id,
      }).then((result) => {
        console.log(result);
      });
      console.log(result);
      res.send({ ok: result });
    }
  } catch (error) {
    console.log(error);
    res.send({
      err: "A problem occured. Please check any empty field/s and try again.",
    });
  }
});

router.put("/case-status/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Case.findByIdAndUpdate(
      { _id: id },
      { active: "Active" }
    );

    if (result) {
      res.send({ ok: result });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/follow-up/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Case.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          followUp: {
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
            paraclinical: {
              name: req.body.paraclinicalName,
              file: req.body.paraclinicalFile,
            },
            wi: req.body.wi,
            imd: req.body.imd,
          },
        },
      }
    );

    if (result) {
      res.send({ ok: result });
    }
  } catch (error) {
    console.log(error);
    res.send({
      err: "A problem occured. Please check any empty field/s and try again.",
    });
  }
});

router.get("/case", async (req, res) => {
  try {
    let result = await Case.find({})
      .populate("designation")
      .populate("physician")
      .populate("patient")
      .populate("subSpecialization");
    if (result) {
      res.send(result);
    }
  } catch (error) {
    res.send({ err: "401 error request." });
    console.log(error);
  }
});

router.put("/case/update/:id", async (req, res) => {
  const id = req.params.id;
  const subSpecialization = req.body.specialization;
  try {
    let result = await Case.findByIdAndUpdate(
      { _id: id },
      { subSpecialization }
    );

    if (result) {
      res.send({ ok: "sd" });
    }
  } catch (error) {
    console.log(error);
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

router.delete("/delete-case/:id", async (req, res) => {
  try {
    let result = await Case.findByIdAndDelete({ _id: req.params.id });
    if (result) {
      Notification.deleteMany({ case: req.params.id }).then((err, success) => {
        res.send({ ok: "Successfullly deleted one (1) case." });
      });
    } else {
      res.send({ err: "Error" });
    }
  } catch (error) {
    res.send({ err: error });
  }
});

router.put("/case/deactivate/:id", async (req, res) => {
  try {
    let result = await Case.findByIdAndUpdate(
      { _id: req.params.id },
      {
        active: "Done",
      }
    );

    if (result) {
      res.send({ ok: "Updated" });
    }
  } catch (error) {
    res.send(error);
  }
});

router.put("/case/activate/:id", async (req, res) => {
  try {
    let result = await Case.findByIdAndUpdate(
      { _id: req.params.id },
      {
        active: "Active",
      }
    );

    if (result) {
      res.send({ ok: "Updated" });
    }
  } catch (error) {
    res.send(error);
  }
});

router.put("/import-patients", async (req, res) => {
  try {
    let result = await Patient.insertMany(req.body.CSV);

    if (result) {
      res.send({
        ok: `Import ${req.body.CSV.length} patients.`,
      });
    }
  } catch (error) {
    res.send({ err: error });
  }
});

module.exports = router;
