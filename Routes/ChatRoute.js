const router = require("express").Router();
const Chat = require("../Models/Chat");

router.get("/", (req, res) => {
  Chat.find({}).populate('user').then((result) => {
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


router.post('/create-chat/:id/:receiver', async(req, res) => {
  try {
    const id = req.params.id;
    const receiver = req.params.receiver;
    const msg = req.body.msg;


    let response = await  Chat.create({
      user: [id, receiver],
      content: msg,
      sender: id,
    });

    if(response) {
      res.send({ok: "Chat sent."});
    }
  } catch (error) {
    console.log(error)
  }
})
module.exports = router;
