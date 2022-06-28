const router = require("express").Router();
const User = require("../Models/User");
const brcypt = require("bcrypt");
const saltRounds = 10;

router.get("/users", async (req, res) => {
  let users = await User.find({})
    .populate("specialization")
    .populate("designation");

  if (!users) {
    res.send({ err: "No users" });
  }

  res.send(users);
});

router.put("/verify/:id", async (req, res) => {
  const id = req.params.id;

  try {
    let user = await User.findById({ _id: id });

    if (user.verified) {
      res.send({ already: "Already verified" });
    } else {
      User.findByIdAndUpdate({ _id: id }, { verified: true }, (err, result) => {
        if (err) {
          res.send({ err: "Error" });
        } else {
          res.send({ ok: "Verified!" });
        }
      });
    }
  } catch (error) {
    res.send({ err: "Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    let result = await User.findOneAndDelete({ _id: id });

    if (result) {
      res.send({ ok: "Deleted" });
    }
  } catch (error) {
    res.send({ err: "Error deleting." });
  }
});

router.get(`/patients/:id`, async (req, res) => {
  const id = req.params.id;

  try {
    let result = await User.findById({ _id: id });

    if (result) {
      res.send(result.patient);
    }
  } catch (error) {
    res.send({ err: "No data" });
  }
});

router.put(`/profile/:id`, async (req, res) => {
  const id = req.params.id;

  try {
    let result = await User.findByIdAndUpdate(
      { _id: id },
      { picture: req.body.picture }
    );

    if (result) {
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/change-password/:id", async (req, res) => {
  const id = req.params.id;
  const old = req.body.old;
  const newP = req.body.newP;

  try {
    let user = await User.findById({ _id: id });
    let hash = await brcypt.hash(newP, saltRounds);

    if (user) {
      brcypt.compare(old, user.password, (error, result) => {
        if (result === false) {
          res.send({ err: "Wrong password" });
          return;
        } else {
          User.findByIdAndUpdate(
            { _id: id },
            {
              password: hash,
            },
            (no, yes) => {
              if (yes) {
                res.send({ ok: "Successfully changed password" });
              }
            }
          );
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const firstname = req.body.firstname;
  const middlename = req.body.middlename;
  const lastname = req.body.lastname;
  const designation = req.body.designation;
  const specialization = req.body.specialization;

  try {
    let result = await User.findByIdAndUpdate(
      { _id: id },
      {
        firstname,
        middlename,
        lastname,
        designation,
        specialization,
      }
    );

    if (result) {
      res.send({ ok: "Updated user" });
    }
  } catch (error) {
    res.send({ err: "An error occured with status 404" });
  }
});

module.exports = router;
