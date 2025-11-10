const mongoose = require("mongoose");
const mongoDbUrl = "mongodb+srv://AmoghDath:Egoistisagiyoichi%4028@uialpha.udvodoi.mongodb.net/Student-meet"
mongoose.connect(mongoDbUrl)

const AdminSchema = new mongoose.Schema({
    username : String,
    password : String
});

const StudentSchema = new mongoose.Schema({
    studentName : String,
    studentEmail : String,
    studentPhone : Number,
    studentId : Number,
    studentPassword : String

});

const TeacherSchema = new mongoose.Schema({
    teacherName : String,
    teacherEmail : String,
    teacherPhone : Number,
    teacherId : Number,
    teacherPassword : String

});

const TeacherDashboardSchema = new mongoose.Schema({
    teacherDiscription : String,
    teacherExperience : String,
    teacherAchievements : String
});



const Admin = mongoose.model("Admin", AdminSchema);
const Student = mongoose.model("Student", StudentSchema);
const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = {
    Admin : Admin,
    Student : Student,
    Teacher : Teacher
}