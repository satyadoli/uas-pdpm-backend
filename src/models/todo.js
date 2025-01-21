// models/todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    imageLink: { // Field untuk link gambar
        type: String,
    },
}, {
    timestamps: true, // Menyediakan createdAt dan updatedAt otomatis
});

module.exports = mongoose.model('Todo', todoSchema);