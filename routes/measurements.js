
const express = require('express');
const router = express.Router();

const {author} = require('../middleware/authorization');
const {authen} = require('../middleware/authentication');

const measurementsController = require('../controllers/measurements');


// router.get('/:id',authen, measurementsController.getMeasurements);

router.get('/',authen, author('admin'), measurementsController.getAllMeasurements);

router.post('/', authen, author('patient'), measurementsController.addMeasurements);

router.put('/:id', authen, author('patient'), measurementsController.addBloodPressure);


router.get('/:id',authen, function(req, res){
    console.log(req.user.role);
    if((req.user.role === 'doctor') || (req.user.role === 'patient') ){
        measurementsController.getMeasurements(req, res);
    }else res.status(403).send('No Rights');
});


module.exports = router;