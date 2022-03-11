//NodeJS the server/backend of web app
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const MongoDBStore = require("connect-mongodb-session")(session);

//Importing Routes
const authRoute = require("./Routes/Authentication");
const userRoute = require("./Routes/UserRoute");
const facilityRoute = require("./Routes/FacilityRoute");
const patientRoute = require("./Routes/PatientRoute");

//MongoDB URI for database connection
const uri =
  "mongodb+srv://admin:admin@ojt-cluster.zdqa4.mongodb.net/TelemedicineDB?retryWrites=true&w=majority";

//Asynchronous connection to database
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(err));

const store = new MongoDBStore({
  uri: uri,
  collection: "session",
});

//Middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    methods: ["PUT", "DELETE", "GET", "POST", "*"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    key: "userId",
    secret: "This is a cookie secret ID",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      httpOnly: true,
      secure: false,
      path: "/",
    },
  })
);

//Route Middlewares
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/facility", facilityRoute);
app.use("/api/patient", patientRoute);

app.get("/error", (req, res) => {
  res.send("You are not authenticated.")
})

//Server listening to PORT 3001 or PORT in production
app.listen(PORT, () => {
  console.log(`Running in PORT ${PORT}`);
});
