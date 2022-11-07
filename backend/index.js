const express = require('express');
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./config/db");
const userModel = require('./models/UserModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authentication } = require('./middleware/authentication');
const todoModel = require('./models/todoModel');
const app = express();
app.use(cors())
app.use(express.json());
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("welcome to home page")
})
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const isUser = await userModel.findOne({ email });
    if (isUser) {
        res.send({ "msg": "user already exist" });
    } else {
        bcrypt.hash(password, 3, async function (err, hash) {
            if (err) {
                res.send({ "Msg": "something went wrong" });
            }
            const new_user = new userModel({
                name,
                email,
                password: hash
            });
            try {
                await new_user.save();
                res.send({ "msg": "user signup successfull" });
            } catch (error) {
                res.send({ "msg": "something wend wrong! please try again later" })
            }
        })
    }
})
// login requiest=-===========

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const hash_password = user.password;
    const user_id = user._id;
    console.log("user id", user_id);
    console.log("user ", user);
    bcrypt.compare(password, hash_password, function (err, result) {
        if (err) {
            res.send({ "msg": "something wrong ! try later" });
        }
        if (result) {
            const token = jwt.sign({ user_id }, "key")
            res.send({ "msg": "login successfull", token })
        } else {
            res.send({ "msg": "login failed" });
        }
    })
})
// task creation--------------------
app.post("/create", authentication, async (req, res) => {
    const { taskname, status, tag, user_id } = req.body;
    console.log(taskname, status, tag, user_id);
    const new_todo = new todoModel({
        taskname,
        status,
        tag,
        user_id
    });
    await new_todo.save();
    res.send({ new_todo });
})
// get todos=======
app.get("/todos", authentication, async (req, res) => {
    const { user_id } = req.body;
    const all_todo = await todoModel.find({user_id});
    res.send({history: all_todo});
})

app.listen(PORT, async () => {
    try {
        await connection;
        console.log("server connected");
        console.log(`server runnig http://localhost:${PORT}`)
    } catch (error) {
        console.log("server not connr=ected", error);
    }

})