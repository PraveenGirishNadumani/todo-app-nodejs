const router = require('express').Router();
const todoRoutes = require('./controller/routes');

router.get('/', (req, res) => {
    return res.json({
        message: 'welcome to todo APIs'
    });
});

router.use('/todo', todoRoutes);



module.exports = router;