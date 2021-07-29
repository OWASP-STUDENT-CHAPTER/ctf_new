const envConfig = {
  path: process.env.NODE_ENV === "production" ? "prod.env" : ".env",
};
const cors = require("cors");

require("dotenv").config(envConfig);
// console.log(process.env.production);

const express = require("express");
const { eventDB } = require("./init/db");
const app = express();
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
// Init
require("./init/db");
require("./init/initEvent")(app);

//route imports
const auth = require("./routes/Auth");
const participants = require("./routes/participants");
const team = require("./routes/Team");
const question = require("./routes/Questions");
const round = require("./routes/rounds");
const stones = require("./routes/stones");

// CORS
app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded());

// * Sessions configuration
app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI_EVENT_DB }), //! change
    // store: MongoStore.create({ client: commonDB}),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000, /*secure: true,*/ httpOnly: true },
  })
);

// * Passport Setup
require("./config/passport-config");
app.use(passport.initialize());
app.use(passport.session());

// Routes
//app.use('./user', require('./routes/user'));
app.use("/api/event", round);
app.use("/api/auth", auth);
app.use("/api/participants", participants);
app.use("/api/team", team);
app.use("/api/question", question);
app.use("/api/stones", stones);
app.use("/api/rounds", round);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server Started on port ${process.env.PORT}`)
);

// * io
const io = require("socket.io")(server, { cors: true });

const session_handler = require("io-session-handler").from(io, {
  timeout: 5000,
});
app.set("session_handler", session_handler);

io.use(async function (socket, next) {
  // console.log("a", socket.handshake.query.teamId);

  const team = await Team.findById(socket.handshake.query.teamId);
  // console.log("team ", team);
  if (!team) {
    next(new Error("Authentication error"));
  }
  return next();
  // call next() with an Error if you need to reject the connection.
});

// require("./init/initSocket")(io, app);

// * Production setup
if (process.env.NODE_ENV === "production") {
  console.log("prod");
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  app.get("/*", function (req, res) {
    // this -->
    // res.cookie("XSRF-TOKEN", req.csrfToken());
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
  });

  process.on("uncaughtException", (err, promise) => {
    console.log(`Error: ${err.message}`);
  });
}
