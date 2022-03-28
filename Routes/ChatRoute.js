const router = require("express").Router();
const Chat = require("../Models/Chat");

router.get("/", (req, res) => {
  Chat.create({
    user: ["623f5714a6a19a97c680e904", "623ec83980a6838424edaa40"],
  }).then(() => {
    console.log("done");
  });
});

router.get("/message", async (req, res) => {
  try {
    let result = await Chat.findOne({
      user: { $in: ["623f5714a6a19a97c680e904" && "62416497c99bb03a1dcdcbe9"] },
    }).populate("user");
    if (result) {
      res.send(result);
    } else {
      res.send("none");
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
