'use strict';

const router = require('express').Router();
const controller = require('./todo');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.get('/:id', controller.get);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router