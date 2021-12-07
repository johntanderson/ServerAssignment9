const express = require('express'),
    CoursesModel = require('./models/Courses'),
    app = express(),
    subjects = ["MATH", "COMPSCI", "MAGD"];

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

app.get('/', (req,res)=>{
    res.render('landing');
});

app.get('/courses/:subject', (req,res)=>{
    const subject = req.params.subject;
    const title = `List of ${subject} Courses`;
    if (!subjects.includes(subject)) return res.render('error');
    CoursesModel.getList(subject, (fields, data)=>{
        res.render('table', {
            title: title,
            fields: fields,
            data: data
        });
    });
});

app.get('/schedule/:subject', (req,res)=>{
    const subject = req.params.subject;
    const title = `Schedule of ${subject} Courses`;
    if (!subjects.includes(subject)) return res.render('error');
    CoursesModel.getSchedule(subject, (fields, data)=>{
        res.render('table', {
            title: title,
            fields: fields,
            data: data
        });
    });
});

app.listen(3000, ()=>{
    console.log("Server is running at localhost:3000...");
});