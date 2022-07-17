//NodeJS the server/backend of web app
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
const cookieParser = require("cookie-parser");
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");

const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const Message = require("./Models/Message");
const Notification = require("./Models/Notification");
const User = require("./Models/User");
const Chat = require("./Models/Chat");
const Case = require("./Models/Case");

//Importing Routes
const authRoute = require("./Routes/Authentication");
const userRoute = require("./Routes/UserRoute");
const facilityRoute = require("./Routes/FacilityRoute");
const patientRoute = require("./Routes/PatientRoute");
const messageRoute = require("./Routes/MessageRoute");
const notificationRoute = require("./Routes/NotificationRoute");
const chatRoute = require("./Routes/ChatRoute");
const reportRoute = require("./Routes/ReportRoute");
const specializationRoute = require("./Routes/SpecializationRoute");

// app.use(express.static("client/build"));
// app.set("trust proxy", 1);

//MongoDB URI for database connection
const uri =
  "mongodb+srv://admin:admin@ojt-cluster.zdqa4.mongodb.net/TelemedicineDB?retryWrites=true&w=majority";

const store = new MongoDBStore({
  uri: uri,
  collection: "session",
});

//Middlewares
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://zcmc.vercel.app",
      "http://localhost:3000",
      "https://zcmc.netlify.app",
    ],
    methods: ["PUT", "DELETE", "GET", "POST", "*"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("trust proxy", 1);
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
      secure: true,
      sameSite: "none",
    },
  })
);

//Asynchronous connection to database
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(err));

//Route Middlewares
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/facility", facilityRoute);
app.use("/api/patient", patientRoute);
app.use("/api/message/", messageRoute);
app.use("/api/notification/", notificationRoute);
app.use("/api/chat/", chatRoute);
app.use("/api/report/", reportRoute);
app.use("/api/spec/", specializationRoute);

// app.get("/*", (req, res) => {
//   res.sendFile(path.resolve(__dirname + "/client/build/index.html"));
// });

app.get("/", (req, res) => {
  res.send("Server is working");
});

// !Warning Very important route do not delete
app.get("/error", (req, res) => {
  res.send("You are not authenticated.");
});

const io = new Server(server, {
  cors: {
    origin: [
      "https://zcmc.vercel.app",
      "http://localhost:3000",
      "https://zcmc.netlify.app",
    ],
    methods: ["PUT", "DELETE", "GET", "POST", "*"],
  },
});

const users = {};

//Socket IO connection
io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`Room ID: ${data}`);
  });

  socket.on("active_status", async (data) => {
    users[socket.id] = data;
    try {
      let result = await User.findByIdAndUpdate(
        { _id: users[socket.id] },
        {
          activeStatus: "Online",
        }
      );

      if (result) {
        User.find({}).then((result) => {
          io.emit("get_chat", result);
        });
      }
    } catch (error) {}
  });

  socket.on("chat", () => {
    User.find({}).then((result) => {
      io.emit("get_chat", result);
    });
  });

  socket.on("send_response", async (data) => {
    Message.create({
      user: data.user,
      room: data.room,
      content: data.content,
      attachment: {
        file: data.file,
        name: data.name,
      },
    }).then(() => {
      Message.find({})
        .populate("user")
        .then((result) => {
          io.emit("receive_response", result);
          console.log(result);
        });
    });
  });

  socket.on("send_chat_messages", async (data) => {
    Chat.create({
      user: [data.from, data.to],
      content: data.content,
      sender: data.from,
    }).then(() => {
      Chat.find({
        user: { $in: [data.from && data.to] },
      })
        .populate("user")
        .populate("sender")
        .then((result) => {
          io.emit("chat_messages", result);
          console.log(result);
        });
    });
  });

  socket.on("case", () => {
    Case.find({}).populate("designation")
    .populate("physician")
    .populate("patient")
    .populate("subSpecialization").then((result) => {
      io.emit("get_case", result);
    });
  })

  socket.on("notif", () => {
    Notification.find({})
      .populate("from")
      .then((result) => {
        io.emit("get_notif", result);
      });
  });

  socket.on("disconnect", async () => {
    try {
      if (users[socket.id]) {
        let result = await User.findByIdAndUpdate(
          { _id: users[socket.id] },
          {
            activeStatus: "Offline",
          }
        );

        if (result) {
          delete users[socket.id];
          User.find({}).then((result) => {
            io.emit("get_chat", result);
          });
        }
      }
    } catch (error) {}
  });
});

//Server listening to PORT 3001 or PORT in production
server.listen(PORT, () => {
  console.log(`Running in PORT ${PORT}`);
});
