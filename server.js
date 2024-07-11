const http = require("http");
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose");


const Config = require("./config/index");
const AuthRouter = require('./routes/auth');
const UserRouter = require('./routes/user');

mongoose.connect(Config.DATABASE.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true, // Ensure TLS/SSL is enabled
  // Ensure that invalid certificates are not allowed
});
const db = mongoose.connection;


db.on("open", () => {
    console.log("db connected")
})

const app = express();


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("./public"))


app.use('/auth', AuthRouter);
app.use('/user', UserRouter)
app.use('/college', UserRouter)


app.post("/", (req, res) => {
    res.send("Server working")
})


const server = http.createServer({}, app)
server.listen(Config.PORT, Config.HOST, () => {
    console.log("server is working " + Config.PORT)
});
