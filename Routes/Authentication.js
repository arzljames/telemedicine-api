const router = require("express").Router();
const User = require("../Models/User");
const Facilities = require("../Models/Facilities");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const brcypt = require("bcrypt");
const saltRounds = 10;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ojttelemedicine@gmail.com",
    pass: "vqmwdonwldpovgou",
  },
});

let randomString = randomstring.generate({
  length: 48,
  charset: "alphabetic",
});

router.post("/register", async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const specialization = req.body.specialization;
  const designation = req.body.designation;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  try {
    let hash = await brcypt.hash(password, saltRounds);

    if (hash) {
      const user = {
        firstname,
        lastname,
        fullname: firstname + " " + lastname,
        specialization:
          designation === "623ec7fb80a6838424edaa29" ? specialization : null,
        designation,
        email,
        username,
        password: hash,
        userType: "user",
      };

      User.create(user, (err, result) => {
        if (err) {
          err.message.includes("email")
            ? res.send({ emailErr: "Email is already in use" })
            : res.send({ usernameErr: "Username is already in use" });
        } else {
          Facilities.findOneAndUpdate(
            { facility: designation },
            { $push: { user: result._id } },
            (error, results) => {
              console.log(results);
            }
          );

          res.send({ ok: "Registered" });
        }
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/navigator", async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const password = req.body.password;

  try {
    const hash = await brcypt.hash(password, saltRounds);

    if (hash) {
      const user = {
        firstname,
        lastname,
        username,
        password: hash,
        verified: true,
        userType: "navigator",
        email: username,
      };

      User.create(user, (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          res.send({ ok: result });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ username });

  try {
    if (!user) {
      res.send({
        err: "The username you entered isn't associated with any Telemedicine account.",
      });
    } else if (!user.verified) {
      res.send({
        verfied: "Your account is pending",
        email: user.email,
      });
    } else {
      brcypt.compare(password, user.password, (error, result) => {
        if (result) {
          req.session.user = {
            loggedIn: true,
            userId: user._id,
            activeStatus: user.activeStatus,
            username: user.username,
            userType: user.userType,
            verified: user.verfied,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            designation: user.designation,
            specialization: user.specialization,
            picture: user.picture,
          };
          const accessToken = jwt.sign(
            {
              username: user.username,
            },
            "123",
            {
              expiresIn: "600s",
            }
          );

          res.send(req.session.user);
        } else {
          res.send({
            err: "Incorrect username or password",
          });
        }
      });
    }
  } catch (error) {
    res.send({
      err: "Error logging in. Please check your account and try again.",
    });
    console.log(error);
  }
});

router.get("/login/", (req, res) => {
  if (req.session.user) {
    res.send(req.session.user);
  } else {
    res.send({ loggedIn: false });
  }
});

router.get("/logout/", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.clearCookie("userId").send("cleared cookie");
    }
  });
});

router.post("/verify/:id", async (req, res) => {
  const email = req.body.email;
  const id = req.params.id;

  try {
    const mailOptions = {
      from: "ojttelemedicine@gmail.com",
      to: email,
      subject: "Account verification",
      html:
        '<p>Click the link below to activate your account: <br /> <a href="https://zcmc.vercel.app/account/verification/' +
        randomString +
        "/" +
        id +
        '">Verify Account.</a></p>',
    };

    let result = await transporter.sendMail(mailOptions);

    if (result) {
      res.send({ ok: "Email sent." });
    } else {
      res.send({ err: "Email not sent" });
    }
  } catch (error) {
    res.send({ err: "Something went wrong." });
  }
});

router.put("/status/:id", async (req, res) => {
  const id = req.params.id;
  const activeStatus = req.body.activeStatus;

  try {
    let result = await User.findByIdAndUpdate(
      { _id: id },
      { activeStatus: activeStatus }
    );

    if (result) {
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/status/:id", async (req, res) => {
  const id = req.params.id;

  try {
    let result = await User.findById({ _id: id });

    if (result) {
      res.send({ activeStatus: result.activeStatus });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/recover/:email", async (req, res) => {
  const email = req.params.email;
  try {
    let result = await User.findOne({ email });

    if (result) {
      const mailOptions = {
        from: "ojttelemedicine@gmail.com",
        to: email,
        subject: "Reset Password",
        html:
          '<p>Click the link below to reset your password: <br /> <a href="https://zcmc.vercel.app/account/reset-password/' +
          randomString +
          "/" +
          result._id +
          '">Reset Password.</a></p>',
      };

      res.send({ ok: "result" });
    } else {
      res.send({
        err: "Email is not associated with any ZCMC Telemedicine account",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
