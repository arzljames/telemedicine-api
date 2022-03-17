//NodeJS the server/backend of web app
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
const cookieParser = require("cookie-parser");
const MongoDBStore = require("connect-mongodb-session")(session);

const {Server} = require('socket.io')
const http = require('http');
const server = http.createServer(app);



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


// !Warning Very important route do not delete
app.get("/error", (req, res) => {
  res.send("You are not authenticated.")
})

const io = new Server(server, {
 cors: {
  origin: "http://localhost:3000",
  methods: ["PUT", "DELETE", "GET", "POST", "*"],
 }
});



//Socket IO connection
io.on("connection", (socket) => {
  console.log(`connected to socket.io with ID: ${socket.id}`)


  socket.on('join_room', (data) => {
    socket.join(data)
    console.log(data)
  })


  socket.on("send_response", (data) => {
    socket.to(data.room).emit("receive_response", data)
    console.log(data);
  })

  socket.on("disconnect", () => {
    console.log("disconnected", socket.id)
  })
})

//Server listening to PORT 3001 or PORT in production
server.listen(PORT, () => {
  console.log(`Running in PORT ${PORT}`);
});


