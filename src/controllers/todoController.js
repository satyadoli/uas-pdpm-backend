// controllers/todoController.js
const Todo = require('../models/todo');

class TodoController {
    async createTodo(req, res) {
        const { title, description, imageLink } = req.body; // Tambahkan imageLink
        const userId = req.user.id;

        try {
            const newTodo = new Todo({
                title,
                description,
                imageLink, // Assign imageLink
                userId,
            });
            await newTodo.save();
            res.status(201).json({ message: 'Todo created successfully', data: newTodo });
        } catch (error) {
            if (error.name === 'ValidationError') {
                const messages = Object.values(error.errors).map((val) => val.message);
                return res.status(400).json({ message: 'Validation error', error: messages });
            } else {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        }
    }

    async getTodos(req, res) {
        const userId = req.user.id;
        try {
            const todos = await Todo.find({ userId });
            res.status(200).json({ data: todos });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    async getTodoById(req, res) {
        const { id } = req.params;
        try {
            const todo = await Todo.findById(id);
            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            res.status(200).json({ data: todo });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    async updateTodoById(req, res) {
        const { id } = req.params;
        const { title, description, completed, imageLink } = req.body; // Tambahkan imageLink

        try {
            const updatedTodo = await Todo.findByIdAndUpdate(
                id,
                { title, description, completed, imageLink }, // Update imageLink
                { new: true }
            );
            if (!updatedTodo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            res.status(200).json({ message: 'Todo updated successfully', data: updatedTodo });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    async deleteTodoById(req, res) {
        const { id } = req.params;
        try {
            const deletedTodo = await Todo.findByIdAndDelete(id);
            if (!deletedTodo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            res.status(200).json({ message: 'Todo deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}

module.exports = new TodoController();
