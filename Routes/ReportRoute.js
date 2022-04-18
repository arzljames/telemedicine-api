const router = require("express").Router();
const Report = require("../Models/Report");

router.get("/", async (req, res) => {
  try {
    let result = await Report.find({}).populate("physician").populate("refer");

    if (result) {
      res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/create", async (req, res) => {
  const report = {};
  try {
    let result = await Report.create({
      creator: !req.body.creator ? "" : req.body.creator,
      reportId: !req.body.reportId ? "" : req.body.reportId,
      from: !req.body.from ? "" : req.body.from,
      to: !req.body.to ? "" : req.body.to,
      refer: !req.body.refer ? "" : req.body.refer,
      specialization: !req.body.specialization ? "" : req.body.specialization,
      age: !req.body.age ? "" : req.body.age,
      gender: !req.body.gender ? "" : req.body.gender,
      physician: !req.body.physician ? "" : req.body.physician,
    });

    if (result) {
      res.send({ ok: result });
    }
  } catch (error) {
    res.send({ err: error });
  }
});

module.exports = router;
