'use strict';

const TodoList = require('../model/todolist.model');

/**
 * 
 * @param {Number} skip skip value for the query
 * @param {Number} limit limit values for the query
 * @returns 
 */
const getTodoList = async (skip, limit) => {
    try {
        const todoListData = await TodoList.find({ archived: false })
        .skip(skip || 0)
        .limit(limit || 15)
        .lean()
        .exec();
        if(todoListData && todoListData.length > 0)
            return todoListData
        else
            return [];
    } catch (error) {
        console.error(`Catch error inside getTodoList(): ${error}`);
        return error;
    }
}

/**
 * controller to get all todo task/action
 * @param {JSON} req API req object
 * @param {JSON} res API res object
 * @returns 
 */
const getAll = async (req, res) => {
    try {
        const list = await getTodoList(req.query.skip, req.query.limit);
        return res.json({
            message: list
        });
    } catch (error) {
        console.error(`Catch error inside getAll-totolist ${error}`);
        res.status(500).json({
            message: error
        });
    }
}

/**
 * controller to get a todo task/action
 * @param {JSON} req API req object
 * @param {JSON} res API res object
 * @returns 
 */
const get = async (req, res) => {
    try {
        const todoList = await TodoList.findById(req.params.id).lean().exec();
        return res.json({
            message: todoList
        });
    } catch (error) {
        console.error(`Catch error inside create-totolist ${error}`);
        res.status(500).json({
            message: error
        });
    }
}

/**
 * controller to create a todo task/action
 * @param {JSON} req API req object
 * @param {JSON} res API res object
 * @returns 
 */
const create = async (req, res) => {
    try {
        const todo = new TodoList(req.body);
        await todo.save();
        return res.json({
            message: todo
        });
    } catch (error) {
        console.error(`Catch error inside create-totolist ${error}`);
        res.status(500).json({
            message: error
        });
    }
}

/**
 * controller to update a todo task/action
 * @param {JSON} req API req object
 * @param {JSON} res API res object
 * @returns 
 */
const update = async (req, res) => {
    try {
        const todo = await TodoList.findOneAndUpdate({_id: req.params.id}, {$set: { status: req.body.status }}, { new: true }).lean().exec();
        return res.json({
            message: todo
        });
    } catch (error) {
        console.error(`Catch error inside update-totolist ${error}`);
        res.status(500).json({
            message: error
        });
    }
}

/**
 * controller to delete a todo task/action
 * @param {JSON} req API req object
 * @param {JSON} res API res object
 * @returns 
 */
const remove = async (req, res) => {
    try {
        await TodoList.findOneAndUpdate({ _id: req.params.id }, { $set: { archived: true }}).lean().exec();
        return res.json({});
    } catch (error) {
        console.error(`Catch error inside delete-totolist ${error}`);
        res.status(500).json({
            message: error
        });
    }
}

module.exports = {
    getTodoList,
    getAll,
    get,
    create,
    remove,
    update
};