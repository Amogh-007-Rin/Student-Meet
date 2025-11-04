const { Teacher } = require("Database\database.js");

function teacherMiddleware(req, res, next) {
    const teacherEmail = req.headers.teacherEmail;
    const teacherId = req.headers.teacherId;
    const teacherPassword = req.headers.teacherPassword;

    Teacher.findone({
        teacherEmail: teacherEmail,
        teacherId: teacherId,
        teacherPassword: teacherPassword
    }).then(function (value) {
        if (value) {
            next()
        }
        else {
            res.status(403).json({
                message: "Teacher not found or the credentials are incorrect"
            })
        }
    })
}

module.exports = teacherMiddleware;