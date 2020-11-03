const express = require("express");
const app = express();
// const model = require('./lib/model');

// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// var fs = require('fs');

const http = require("http");
const socketIo = require("socket.io");
// const port = 5000;

const server = http.createServer(app);

const io = socketIo(server);
const Socket = require("./lib/socket");

io.on("connection", (socket) => {
    let connection = new Socket(socket);    
});

const uniqid = require("uniqid");

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.static("images"));

const multer  = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      cb(null, uniqid() + Date.now() + file.originalname)
    }
})
   
var upload = multer({ storage: storage });



/* CONTROLERS SECTION */

const UserController = require("./controllers/UserController");
const SettingsController = require("./controllers/SettingsController");
const FriendsController = require("./controllers/FriendsController");
const MessagesController = require("./controllers/MessagesController");
const OtherUserController = require("./controllers/OtherUserController");
const AdminController = require("./controllers/AdminController");
const PostsContoller = require("./controllers/PostsContoller");


/* User Controller */ 
app.post("/add", (req, res) => UserController.add(req, res));
app.post("/login", (req, res) => UserController.login(req, res));
app.post("/profile", (req, res) => UserController.profile(req, res));
app.post("/user/search", (req, res) => UserController.search(req, res));
app.post("/allusers", (req, res) => UserController.allUsersList(req, res));

/* Settings Controller */ 
app.post("/changeYourLogin", (req, res) => SettingsController.changeLogin(req, res));
app.post("/changeYourPassword", (req, res) => SettingsController.changePassword(req, res));
app.post("/upload", upload.single("nkar"), (req, res) => SettingsController.UploadUserPic(req, res));

/* FriendsController */
app.post("/friendship", (req, res) => FriendsController.friendship(req, res));
app.post("/friend/requests", (req, res) => FriendsController.friendRequests(req, res));
app.post("/friend/reject", (req, res) => FriendsController.friendReject(req, res));
app.post("/friend/accept", (req, res) => FriendsController.friendAccept(req, res));
app.post("/friend/friends", (req, res) => FriendsController.friendFriends(req, res));
app.post("/friend/messagnerfriends", (req, res) => FriendsController.friendMessagnerfriends(req, res));
app.post("/friend/remove", (req, res) => FriendsController.friendRemove(req, res));
app.post("/request/cancel", (req, res) => FriendsController.requestCancel(req, res));
app.post("/friend/unfriend", (req, res) => FriendsController.friendUnfriend(req, res));

/* MessagesController */
app.post("/user/sendmessage", (req, res) => MessagesController.sendmessage(req, res));
app.post("/getMessages", (req, res) => MessagesController.getMessages(req, res));
app.post("/user/searchmessenger", (req, res) => MessagesController.searchMessenger(req, res));

/* OtherUserController */
app.post("/user/profile/:id", (req, res) => OtherUserController.OtherUserProfile(req, res));
app.post("/otheruser/posts/:id", (req, res) => OtherUserController.OtherUserPosts(req, res));
app.post("/share/:id", (req, res) => OtherUserController.SharePost(req, res));

/* AdminController */
app.post("/admin/dashboard", (req, res) => AdminController.AdminDashboard(req, res));
app.post("/admin/dashboard/block", (req, res) => AdminController.AdminDashboardBlock(req, res));
app.post("/admin/dashboard/unblock", (req, res) => AdminController.AdminDashboardUnblock(req, res));

/* PostsController */
app.post("/user/posts", (req, res) => PostsContoller.UserPosts(req, res));
app.post("/user/posts/delete", (req, res) => PostsContoller.UserPostsDelete(req, res));
app.post("/user/myposts", upload.single("nkar"), (req, res) => PostsContoller.UploadMyPosts(req, res));



app.get("/", (req, res) => {
    res.send("OK");
});



/* SERVER */
server.listen(5000, () => {
    console.log("server started at port 5000");
});


