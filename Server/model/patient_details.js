const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PatientDetails = Schema({
    userId: String,
    patient: {
        name: String,
        age: Number,
        gender: String,
        bloodgroup: String,
        dob: String,
        occupation: String,
        address: String,
        phone_no: Number
    },
    complaint: {
        cheif_complaint: String,
        associate_complaint: String
    },
    history: {
        past_history: String,
        medical_history: String,
        family_history: String
    },
    test: {
        food: String,
        urine: String,
        stool: String,
        sleep: String,
        others: String,
        bp: String,
        pulse: String,
        rs: String,
        cvs: String,
        temp: String,
        systematic_examination: String,
        investigation: String,
        diagnosis: String,
        differential_diagnosis: String
    }
});

module.exports = mongoose.model('patient_detail', PatientDetails);