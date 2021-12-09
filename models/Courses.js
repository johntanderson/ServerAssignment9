const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url,  { useUnifiedTopology: true });
const Courses = {};

client.connect()
.then( _ =>{
    console.log("MongoDB connected!");
    client.close();
})
.catch( err => {
    console.log("An error occured while connecting to MongoDB!");
})

Courses.getList = async(subject) => {
    let data = [["Subject", "#", 'Title', 'Description', 'Credits']]
    try {
        await client.connect();
    } catch (err) {
        console.log("An error occured while connecting to DB.");
        return data;
    }
    try {
        let tmp = await client.db("uww").collection("courses").find({"subject": subject}).project({_id: 0, mincredits: 0, prereq: 0}).toArray();
        tmp.forEach((record)=>{
            data.push([record.subject, record.number, record.title, record.description, record.maxcredits])
        });
    } catch (err) {
        console.log("An error occured while querying the DB.");
    } finally {
        client.close();
        return data;
    }

}

Courses.getSchedule = async(subject) => {
    let data = [["Subject", "#", 'Section', 'Instructor', 'Time', 'Location']]
    try {
        await client.connect();
    } catch (err) {
        console.log("An error occured while connecting to DB.");
        return data;
    }
    try {
        let tmp = await client.db("uww").collection("schedule").find({"subject": subject}).project({_id: 0}).toArray();
        tmp.forEach((record)=>{
            data.push([record.subject, record.number, record.sectionId, record.instructor, record.displayTime, record.location])
        });
    } catch (err) {
        console.log("An error occured while connecting to DB.");
    }
    client.close();
    return data;
}

module.exports = Courses;