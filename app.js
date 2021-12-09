const express = require('express'),
    CoursesModel = require('./models/Courses'),
    app = express(),
    subjects = ["MATH", "COMPSCI", "MAGD"];

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

function runAsync (callback) {
    return function (req, res, next) {
        callback(req, res, next).catch(next)
    }
}

app.get('/', (_,res)=>{
    res.render('landing');
});

app.get('/courses/:subject', runAsync(async (req, res) => {
    if (!subjects.includes(req.params.subject)) return res.render('error');
    res.render('table', {
        title: `List of ${req.params.subject} Courses`,
        data: await CoursesModel.getList(req.params.subject),
    });
}));

app.get('/schedule/:subject', runAsync(async (req, res) => {
    if (!subjects.includes(req.params.subject)) return res.render('error');
    res.render('table', {
        title: `Schedule of ${req.params.subject} Courses`,
        data: await CoursesModel.getSchedule(req.params.subject),
    });
}));

app.listen(3000, ()=>{
    console.log("Server is running at localhost:3000...");
});