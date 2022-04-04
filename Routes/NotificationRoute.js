const router = require("express").Router();
const Notification = require("../Models/Notification");

router.get("/", async (req, res) => {
  try {
    let result = await Notification.find({}).populate("from").populate("case");
    if (result) {
      res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async(req, res) => {
  try {
    let result = await Notification.findByIdAndUpdate({_id: req.params.id}, {active: false});
    if(result) {
      res.send({ok: "Successfully updated"});
    }
  } catch (error) {
    console.log(error)
    
  }
})

// router.get("/find/:id", async (req, res) => {
//   try {
//     let result = await Notification.find({
//       user: { $in: req.params.id },
//     }).populate("user");
//     res.send(result);
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
