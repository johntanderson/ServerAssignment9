const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url,  { useUnifiedTopology: true });
Courses = {};

Courses.getList = async(subject) => {
    try {
        await client.connect();
        let data = await client.db("uww").collection("courses").find({"subject": subject}).project({_id: 0, mincredits: 0, prereq: 0}).toArray();
        client.close();
        return data;
    } catch (err) {
        console.log("An error occured while connecting to DB.");
        client.close();
        return {};
    }
}

Courses.getSchedule = async(subject) => {

}



















// client.connect(function(err) {
//   if (err) throw err;
//   console.log("done !");
//   client.close();
// });

// client.connect((err) => {
//   if (err) throw err;
//       /*  Change the database. 
//       */
//       const dbo = client.db('uww');
    
//       /* Fetch data from 'courses' collection and then use .toArray() method to 
//           to read all documents returned by the cursor
//       */
//       dbo.collection('courses').find({subject: "COMPSCI"}).toArray( (err, rows) => {
//           if (err) throw err;
//           const courseList = rows;
//           console.log(courseList)
//           if (courseList.length) {
//               courseList.forEach(s => {
//               });
//           }
//           client.close();
//       });
// });

// conn.connect((err)=>{
//     err ? console.log(err) : console.log("Connected to database.");
// });

// Courses.getList = (subject, callback)=> {
    
//     const query = "SELECT `subject`, `number`, `title`, `description`, `maxcredits` FROM `courses` WHERE `subject`= ? ORDER BY `number`";
     
//     conn.query(query, [subject], (err, results, fields)=>{
//         if (err) throw err;
//         fields = fields.map((field)=>{ return capitalizeFirstLetter(field.name);});
//         callback(fields, results);
//     })
// }

// Courses.getSchedule = (subject, callback)=> {
//     const query = "SELECT `subject`, `number`, `sectionId`, `instructor`, `displayTime`, `location` FROM `schedule` WHERE `subject`= ? ORDER BY `number`, `sectionId`";
//     conn.query(query, [subject], (err, results, fields)=>{
//         if (err) throw err;
//         fields = fields.map((field)=>{ return capitalizeFirstLetter(field.name);});
//         callback(fields, results);
//     })
// }

function capitalizeFirstLetter(string) {
    if (string === "number") string = "#";
    if (string === "maxcredits") string = "credits";
    if (string === "displayTime") string = "time";
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = Courses;