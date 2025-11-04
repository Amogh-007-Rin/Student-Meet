const { Student } = require("Database\database.js");

function studentMiddleware(req, res, next) {
    const studentEmail = req.headers.studentEmail;
    const studentPassword = req.headers.studentPassword;

    Student.findOne({
        studentEmail: studentEmail,
        studentPassword: studentPassword

    })
        .then(function (value) {
            if (value) {
                next()
            }
            else {
                res.status(403).json({
                    message: "Student does not exist or the credentials are incorrect"
                })
            }
        })
}

module.exports = studentMiddleware;