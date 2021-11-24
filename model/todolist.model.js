const mongoose = require('mongoose');

const todoListSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['New, Pending, Done']
    },
    archived: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('todoList', todoListSchema);