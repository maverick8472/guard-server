
const {Measurement, validatePost, average} = require('../models/measurement');
const {User} = require('../models/user');

async function getMeasurements(req, res){
    const measurement = await Measurement.findById(req.params.id);
    if(!measurement) return res.status(404).send('The user with that id was not found!');
    res.send(measurement);
};

async function getAllMeasurements(req, res){
    const measurements = await Measurement.find().sort('_id');
    res.send(measurements);
};

async function addMeasurements(req, res) {
    const {error} = validatePost(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const doctor = await User.findById(req.body.doctorId);
    if(!doctor) return res.status(404).send('The doctor with that id was not found!');

    const patient = await User.findById(req.body.patientId);
    if(!patient) return res.status(404).send('The patient with that id was not found!');

    const measurement = new Measurement({
        patientId: req.body.patientId,
        doctorId: req.body.doctorId,
    })

    await measurement.save();
    res.send(measurement);
};

async function addBloodPressure(req, res){
    const measurement = await Measurement.findById(req.params.id);
    if(!measurement) return res.status(404).send('The measurement with the given ID was not found.');
    measurement.data.push({bloodPresure: req.body.bloodPresure,time: new Date})
    measurement.save();
    res.send(measurement);
};

exports.getMeasurements = getMeasurements;
exports.getAllMeasurements = getAllMeasurements;
exports.addMeasurements = addMeasurements;
exports.addBloodPressure = addBloodPressure;