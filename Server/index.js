const mongoose = require('mongoose');
const express = require('express');
const app = express();

const userRoute = require('./route/user');
const user_detailsRoute = require('./route/patient_detail');

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credential', 'true');
    next();
});

app.use('/', userRoute);
app.use('/patient_details', user_detailsRoute);

app.use((error, req, res, next) => {
    if (error) {
        const message = error.message;
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: message
        });
    }
});

mongoose.connect('mongodb+srv://Casesheet:Casesheet0206@casecluster.svqop.mongodb.net/CaseCluster?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        const server = app.listen(3100);
        const io = require('./utility/socket').init(server);
        io.on('connection', server => {
            console.log('socket is connected');
        });
    })
    .catch(err => {
        console.log(err)
    })