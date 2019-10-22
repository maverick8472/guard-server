
const Joi = require('joi');
const mongoose = require('mongoose');

const Measurement = mongoose.model('Measurement',new mongoose.Schema({
    patientId: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    doctorId: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    data: [
        {   
            time: {type: Date, default: Date.now}, 
            bloodPresure: Number
        }
    ],
    
}));

function validatePost(measurement){
    const schema = {
        patientId: Joi.string().min(3).required(),
        doctorId: Joi.string().min(3).required(),
        bloodPresure: Joi.number().optional()
    };
    return Joi.validate(measurement, schema);
}

function average(measurement){

    let sum = 0;
    let cnt = 0;
    measurement.data.forEach(element => {
        console.log(element.bloodPresure);
        sum +=element.bloodPresure;
        cnt++;
    });
    return(sum/cnt);
}

exports.Measurement = Measurement;
exports.validatePost = validatePost;
exports.average = average;