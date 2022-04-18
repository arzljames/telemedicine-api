const router = require("express").Router();
const Report = require("../Models/Report");

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
      res.send(result);
    }
  } catch (error) {}
});

module.exports = router;
