const router = require("express").Router();
const Chat = require("../Models/Chat");

router.get("/", (req, res) => {
  Chat.find({}).then((result) => {
    res.send(result)
  })
});

router.get("/message/:from/:receiver", async (req, res) => {
  try {
    let result = await Chat.find({
      user: { $in: [req.params.from && req.params.receiver] },
    }).populate("user").populate("sender")
    if (result) {
      res.send(result);
    } else {
      res.send("none");
    }
  } catch (error) {
    console.log(req.params.receiver);
  }
});
module.exports = router;
