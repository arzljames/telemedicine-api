const router = require("express").Router();
const Report = require("../Models/Report");

router.get("/", async (req, res) => {
  try {
    let result = await Report.find({});

    if (result) {
      res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/create", async (req, res) => {
  const report = {
    creator: req.body.creator,
    reportId: req.body.reportId,
    from: req.body.from,
    to: req.body.to,
    refer: req.body.refer,
    specialization: req.body.specialization,
    age: req.body.age,
    gender: req.body.gender,
    physician: req.body.physician,
  };
  try {
    let result = await Report.create(report);

    if (result) {
      res.send({ ok: result });
    }
  } catch (error) {
    res.send({ err: "Error creating report" });
  }
});

module.exports = router;
