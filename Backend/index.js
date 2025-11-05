const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer();
const {Admin} = require("../Database/database");
const adminMiddleware = require("./middlewares/admin");
const port = 3000;

app.use(express.json())

// Admin signup route
app.post("/admin/signup", upload.none(), async (req, res) => {
    // This code represents the admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username : username,
        password : password
    })
    res.json({
        message : "Admin Created Successfully"
    })
});

// // Student signup route
// app.post("student/signup", async (req , res) => {
//     // This code represents the student signup logic
//     const studentName     = req.body.studentName;
//     const studentEmail    = req.body.studentEmail;
//     const studentPhone    = req.body.studentPhone;
//     const studentId       = req.body.studentId;
//     const studentPassword = req.body.studentPassword;

//     await Student.create({
//         studentName     : studentName,
//         studentEmail    : studentEmail,
//         studentPhone    : studentPhone,
//         studentId       : studentId,
//         studentPassword : studentPassword
//     })
//     res.json({
//         message : "Student created successfully"
//     })
// });

// Teacher signup route
// app.post("teacher/signup", async (req, res) =>{
//     // This code represents the teacher signup logic
//     const teacherName = req.body.teacherName;
//     const teacherEmail = req.body.teacherEmail;
//     const teacherPhone = req.body.teacherPhone;
//     const teacherId = req.body.teacherId;
//     const teacherPassword = req.body.teacherPassword;

//     await Teacher.create({
//         teacherName      : teacherName,
//         teacherEmail     : teacherEmail,
//         teacherPhone     : teacherPhone,
//         teacherId        : teacherId,
//         teacherPassword  : teacherPassword
//     })
//     res.json({
//         message : "Teacher created successfully"
//     })

// });

// Admin singin route

app.post("/admin/signin", upload.none(), adminMiddleware, function(req , res){
       res.status(200).json({
        message : "signup successful"
       })
});

app.get("/", function(req,res){
    res.json({
        message : "The backend is up"
    })
});

app.listen(port, function(){
    console.log("The server is running at port :", port)
})
