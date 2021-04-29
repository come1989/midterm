const { Router } = require('express');
const router = Router();

router.use('/admin', require('./admin'));

/*
router.get('/', (req, res) => {
    res.send('Hello World');
});
*/

module.exports = router;
/*
 *  controllers/index                   main category url   |   folder location
 *  controllers/admin/index.js          admin url           |   middleware
 *  controllers/admin/admin.ctrl.js     controller role
 */