const PatientDetails = require('../model/patient_details');

exports.getData = async(req, res, next) => {
    try {
        const userId = req.userId;
        const details = await PatientDetails.find({ userId: userId });
        if (details.length == 0) {
            const error = new Error('No records found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'records founded',
            response: details
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.postData = async(req, res, next) => {
    const userId = req.userId;
    const {
        name,
        age,
        gender,
        bloodgroup,
        dob,
        occupation,
        address,
        phone_no,
        cheif_complaint,
        associate_complaint,
        past_history,
        medical_history,
        family_history,
        food,
        urine,
        stool,
        sleep,
        others,
        bp,
        pulse,
        rs,
        cvs,
        temp,
        systematic_examination,
        investigation,
        diagnosis,
        differential_diagnosis
    } = req.body;
    try {
        const patient_details = await PatientDetails.create({
            userId: userId,
            patient: {
                name: name,
                age: age,
                gender: gender,
                bloodgroup: bloodgroup,
                dob: dob,
                occupation: occupation,
                address: address,
                phone_no: phone_no
            },
            complaint: {
                cheif_complaint: cheif_complaint,
                associate_complaint: associate_complaint
            },
            history: {
                past_history: past_history,
                medical_history: medical_history,
                family_history: family_history
            },
            test: {
                food: food,
                urine: urine,
                stool: stool,
                sleep: sleep,
                others: others,
                bp: bp,
                pulse: pulse,
                rs: rs,
                cvs: cvs,
                temp: temp,
                systematic_examination: systematic_examination,
                investigation: investigation,
                diagnosis: diagnosis,
                differential_diagnosis: differential_diagnosis
            }
        });
        if (patient_details) {
            res.status(200).json({
                message: 'patient details registered'
            });
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.deleteData = async(req, res, next) => {
    const userId = req.userId;
    const dataId = req.params.id;
    try {
        const deleteData = await PatientDetails.findByIdAndDelete(dataId);
        if (deleteData) {
            res.status(200).json({
                message: 'record is deleted'
            });
        }
        const io = require('../utility/socket').getIO();
        const updatedData = await PatientDetails.find({ userId: userId });
        io.emit('updatedData', { action: 'updated data', response: updatedData });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}