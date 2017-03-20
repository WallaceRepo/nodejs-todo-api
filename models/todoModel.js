/**
 * Dependencies */

var mongoose = require('mongoose');

/**
 * Setup */

var todoSchema = new mongoose.Schema({
    username: String,
    todo: String,
    isDone: Boolean,
    hasAttachment: Boolean
});

var Todos = mongoose.model('Todos', todoSchema);

module.exports = Todos;