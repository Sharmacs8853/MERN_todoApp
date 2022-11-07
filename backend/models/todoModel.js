const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    taskname:{type: String, require: true},
    status:{type: Boolean, require: true},
    tag:{type: String, require: true},
})

const todoModel = mongoose.model("todo", todoSchema);
module.exports = todoModel