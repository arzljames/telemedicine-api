const router = require("express").Router();
const User = require("../Models/User");
const Message = require("../Models/Message");

router.get("/", async (req, res) => {
  try {
    let result = await Message.find({}).populate("user");

    if (result) {
      res.send(result);
    }
  } catch (error) {
    res.send({ err: "Error 401 request." });
  }
});

module.exports = router;
