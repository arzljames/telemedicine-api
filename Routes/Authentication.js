const router = require("express").Router();
const User = require("../Models/User");
const checkAuth = require("../Middlewares/CheckAuth");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

const brcypt = require("bcrypt");
const saltRounds = 10;

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
        specialization,
        designation,
        email,
        username,
        password: hash,
        userType: "user",
      };

      User.create(user, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
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
        err: "The username or password you entered is not associated with any ZCMC Telemedicine's account.",
      });
    } else if (!user.verified) {
      res.send({
        verfied: "Your account is pending",
        email: user.email
      });
    } else {
      brcypt.compare(password, user.password, (error, result) => {
        if (result) {
          req.session.user = {
            loggedIn: true,
            userId: user._id,
            username: user.username,
            userType: user.userType,
            verified: user.verfied,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            designation: user.designation,
            specialization: user.specialization,
            picture: user.picture
          };
          res.send(req.session.user);
        } else {
          res.send({
            err: "The username or password you entered is incorrect. Please check your account and try again.",
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

router.get("/login", checkAuth, (req, res) => {
  if (req.session.user) {
    res.send(req.session.user);
  } else {
    res.send({ loggedIn: false });
  }
});

router.get("/logout", (req, res) => {
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
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ojttelemedicine@gmail.com",
        pass: "vqmwdonwldpovgou",
      },
    });

    let randomString = randomstring.generate({
      length: 48,
      charset: 'alphabetic'
    });

    const mailOptions = {
      from: "ojttelemedicine@gmail.com",
      to: email,
      subject: "Account verification",
      html: '<p>Click the link below to activate your account: <br /> <a href="http://localhost:3000/account/verification/' + randomString + '/' + id  + '">Verify Account.</a></p>',
    };

    let result = await transporter.sendMail(mailOptions);

    if(result) {
      res.send({ok: "Email sent."})
    } else {
      res.send({err: "Email not sent"})
    }
  } catch (error) {
    res.send({err: "Something went wrong."})
  };
});

module.exports = router;
